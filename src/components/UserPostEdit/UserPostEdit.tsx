'use client';

import Notification from '@/components/Notification/Notification';
import { deletePhoto } from '@/utils/actions/uploadActions';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsCloudUpload } from 'react-icons/bs';
import { toast } from 'react-toastify';

interface State {
    title: string;
    description: string;
    brand: string;
    number: string;
    category: string;
    quantity: string;
    photo: File | null;
}

const UserPostEdit = ({ params, userPostEdit }: any) => {
    const [state, setState] = useState<State>({
        title: '',
        description: '',
        brand: '',
        number: '',
        category: '',
        quantity: '',
        photo: null
    });

    const [loading, setLoading] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (userPostEdit) {
            setState(userPostEdit);
        }
    }, [userPostEdit]);

    const CLOUD_NAME = "djhjt07rh";
    const UPLOAD_PRESET = "nextjs_blog_images";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { title, description, brand, number, category, quantity, photo } = state;

        if (title.length < 4) {
            return toast.error("Title must be at least 4 characters long");
        }
        if (description.length < 20) {
            return toast.error("Description must be at least 20 characters long", { position: 'top-center' });
        }
        if (!number) {
            return toast.error("Number is required", { position: 'top-center' });
        }
        if (!category) {
            return toast.error("Category is required", { position: 'top-center' });
        }
        if (!quantity) {
            return toast.error("Quantity is required", { position: 'top-center' });
        }
        if (brand.length < 3) {
            return toast.error("Brand must be at least 3 characters long", { position: 'top-center' });
        }
        if (photo && photo.size > 5 * 1024 * 1024) {
            return toast.error("File size is too large. Please select a file under 5MB", { position: 'top-center' });
        }

        try {
            setLoading(true);
            let image;
            if (photo) {
                image = await uploadImage();
                if (userPostEdit?.image?.id) {
                    await deletePhoto(userPostEdit?.image?.id);
                }
            } else {
                image = userPostEdit?.image;
            }

            const userPost = {
                title,
                description,
                brand,
                number,
                category,
                quantity,
                image,
                authorId: session?.user.id
            };

            const response = await fetch(`/api/userpost/${params.id}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify(userPost)
            });

            if (response.ok) {
                toast.success("User Post updated successfully!", { position: "top-center" });
                setTimeout(() => {
                    router.refresh();
                    router.push("/dashboard");
                }, 500);
            } else {
                toast.error("Error occurred while updating post.");
            }

        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const uploadImage = async () => {
        const formData = new FormData();
        formData.append('file', state.photo!);
        formData.append('upload_preset', UPLOAD_PRESET);

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                method: "POST",
                body: formData
            });
            const data = await res.json();
            return {
                id: data.public_id,
                url: data.secure_url
            };
        } catch (error) {
            console.log(error);
            throw new Error("Image upload failed");
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, files } = event.target as HTMLInputElement;
        if (type === 'file' && files) {
            setState({ ...state, [name]: files[0] });
        } else {
            setState(prevState => ({ ...prevState, [name]: value }));
        }
    };

    const handleCancelUploadImage = () => {
        setState(prevState => ({ ...prevState, photo: null }));
    };

    const inputStyle = "mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus:outline-blue-300 focus:placeholder-transparent placeholder:text-green-500";
    const formDiv = 'w-full bg-white max-w-xl m-auto p-5 flex rounded-md flex-col border-2 border-red-300';

    return (
        <>
            {userPostEdit && (
                <div className='lg:px-20 px-0 pt-2'>
                    <div className='w-full bg-black px-1 py-2 rounded-md'>
                        <div className={formDiv}>
                            <h1 className='text-black text-3xl text-center'>User Post Update</h1>
                            <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
                                <div className='flex flex-col'>
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        name='title'
                                        value={state.title}
                                        onChange={handleChange}
                                        placeholder='Enter your title'
                                        className={inputStyle} />
                                </div>
                                <div className='flex flex-col'>
                                    <label>Description</label>
                                    <textarea
                                        typeof='text'
                                        name="description"
                                        onChange={handleChange}
                                        value={state.description}
                                        placeholder='Enter your description'
                                        className={`${inputStyle} placeholder:pt-3`} />
                                </div>
                                <div className='flex flex-col'>
                                    <label>Category</label>
                                    <input
                                        type="text"
                                        name='category'
                                        value={state.category}
                                        onChange={handleChange}
                                        placeholder='Enter your category'
                                        className={inputStyle} />
                                </div>
                                <div className='flex flex-col'>
                                    <label>Brand</label>
                                    <input
                                        type="text"
                                        name='brand'
                                        value={state.brand}
                                        onChange={handleChange}
                                        placeholder='Enter your brand'
                                        className={inputStyle} />
                                </div>
                                <div className='flex flex-col'>
                                    <label>Mobile Number</label>
                                    <input
                                        type="text"
                                        name='number'
                                        value={state.number}
                                        onChange={handleChange}
                                        placeholder='Enter your mobile number'
                                        className={inputStyle} />
                                </div>
                                <div className='flex flex-col'>
                                    <label>Quantity</label>
                                    <input
                                        type="number"
                                        name='quantity'
                                        value={state.quantity}
                                        onChange={handleChange}
                                        placeholder='Enter your quantity'
                                        className={inputStyle} />
                                </div>
                                <div className='flex flex-col'>
                                    <label className='mb-2 text-sm font-medium'>Image</label>
                                    <label>
                                        <div
                                            className='h-40 w-full overflow-hidden bg-slate-200 rounded flex items-center justify-center cursor-pointer'>
                                            {state.photo ? (
                                                <div className="w-full h-full relative">
                                                    <Image
                                                        src={URL.createObjectURL(state.photo)}
                                                        width={500}
                                                        height={500}
                                                        alt='image'
                                                        sizes='100vw'
                                                        className="w-full h-full"
                                                    />
                                                    <button onClick={handleCancelUploadImage} type="button" className="text-red-700 hover:text-white hover:bg-black top-0 absolute px-2 py-2 border border-black rounded-full" >
                                                        <AiOutlineClose size={20} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    {userPostEdit?.image && userPostEdit?.image?.url && (
                                                        <div className="w-full h-full ">
                                                            <Image
                                                                src={userPostEdit?.image?.url}
                                                                width={500}
                                                                height={500}
                                                                alt='image'
                                                                sizes='100vw'
                                                                className="w-full h-full"
                                                            />

                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </label>
                                    <input onChange={handleChange} type="file" name='photo' accept='image/*' />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full hover:scale-105 transition-all duration-300 m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4"
                                >
                                    {loading ? "Submiting..." : "Update"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            <Notification />
        </>
    );
};

export default UserPostEdit;
