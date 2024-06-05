'use client';

import Notification from '@/components/Notification/Notification';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
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

const initialState: State = {
    title: "",
    description: "",
    brand: "",
    number: "",
    category: "",
    quantity: "",
    photo: null // Changed to null to represent no file initially
};

const UserPost = () => {
    const [state, setState] = useState<State>(initialState);
    const [loading, setLoading] = useState(false);
    const { data: session } = useSession();
    const router = useRouter();
    // console.log('session_id', session?.user.id)

    //cloudinary upload name 
    const CLOUD_NAME = "djhjt07rh";
    const UPLOAD_PRESET = "nextjs_blog_images";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { title, description, brand, number, category, quantity, photo } = state;

        if (title.length < 4) {
            return (
                toast.error("Title must be at least 4 chareachers long")
            )
        }
        if (description.length < 20) {
            return (
                toast.error("description must be at least 20 chareachers long", { position: 'top-center' })
            )
        }
        if (!number) {
            return (
                toast.error("number must be required!", { position: 'top-center' })
            )
        }
        if (!category) {
            return (
                toast.error("category must be required!", { position: 'top-center' })
            )
        }
        if (!quantity) {
            return (
                toast.error("quantity must be required!", { position: 'top-center' })
            )
        }

        if (brand.length < 3) {
            return (
                toast.error("brand must be at least 6 chareachers long", { position: 'top-center' })
            )
        }
        if (photo) {
            const maxSize = 5 * 1024 * 1024; // 5MB in bytes
            if (photo.size > maxSize) {
                toast("File size is too large. Please select a file under 5MB", { position: 'top-center' });
                return;
            }
        }

        try {
            setLoading(true)
            const image = await uploadImage();

            const userPost = {
                title,
                description,
                brand,
                number,
                category,
                quantity,
                image,
                authorId: session?.user.id
            }

            const response = await fetch('/api/userpost', {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(userPost)
            });

            if (response.ok) {

                toast.success("User Ceated Post successfull!", { position: "top-center" });
                setTimeout(() => {
                    setState(initialState)
                    router.refresh();
                    router.push("/dashboard");
                }, 500)
            } else {
                setState(initialState)
                toast.error("Error occurred white creating blog.")
            }

        } catch (error: any) {
            setState(initialState)
            toast.error(error)
        } finally {
            setState(initialState)
            setLoading(false);

        }
    };

    //cloudinary image upload
    const uploadImage = async () => {
        if (!state.photo) return;
        const formdata = new FormData();

        formdata.append('file', state.photo);
        formdata.append('upload_preset', UPLOAD_PRESET);

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                method: "POST",
                body: formdata
            });
            const data = await res.json();

            const image = {
                id: data['public_id'],
                url: data['secure_url']
            };
            return image;

        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type, files } = event.target as HTMLInputElement;
        if (type === 'file' && files) {
            setState({ ...state, [name]: files[0] });
        } else {
            setState((prevState) => ({ ...prevState, [name]: value }));
        }
    };



    console.log('user post', state);

    const inputStyle = "mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus:outline-blue-300 focus:placeholder-transparent placeholder:text-green-500";
    const formDiv = 'w-full bg-white max-w-xl m-auto p-5 flex rounded-md flex-col border-2 border-red-300';

    return (
        <>
            <div className='lg:px-20 px-0 pt-2'>
                <div className='w-full bg-black px-1 py-2 rounded-md'>
                    <div className={formDiv}>
                        <h1 className='text-black text-3xl text-center'>User information</h1>
                        <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
                            <div className='flex flex-col'>
                                <label>Title</label>
                                <input
                                    type="text"
                                    name='title'
                                    value={state.title}
                                    onChange={handleChange}
                                    placeholder='enter your title'
                                    className={inputStyle} />
                            </div>
                            <div className='flex flex-col'>
                                <label>Description</label>
                                <textarea
                                    typeof='text'
                                    name="description"
                                    onChange={handleChange}
                                    value={state.description}
                                    placeholder='enter your description'
                                    className={`${inputStyle} placeholder:pt-3`} />
                            </div>
                            <div className='flex flex-col'>
                                <label>Category</label>
                                <input
                                    type="text"
                                    name='category'
                                    value={state.category}
                                    onChange={handleChange}
                                    placeholder='enter your category'
                                    className={inputStyle} />
                            </div>
                            <div className='flex flex-col'>
                                <label>Brand</label>
                                <input
                                    type="text"
                                    name='brand'
                                    value={state.brand}
                                    onChange={handleChange}
                                    placeholder='enter your brand'
                                    className={inputStyle} />
                            </div>
                            <div className='flex flex-col'>
                                <label>Mobile Number</label>
                                <input
                                    type="text"
                                    name='number'
                                    value={state.number}
                                    onChange={handleChange}
                                    placeholder='enter your mobile number'
                                    className={inputStyle} />
                            </div>
                            <div className='flex flex-col'>
                                <label>Quantity</label>
                                <input
                                    type="number"
                                    name='quantity'
                                    value={state.quantity}
                                    onChange={handleChange}
                                    placeholder='enter your quantity'
                                    className={inputStyle} />
                            </div>
                            <div className='flex flex-col'>
                                <label className='mb-2 text-sm font-medium'>Image</label>
                                <label>
                                    <div
                                        className='h-40 w-full overflow-hidden bg-slate-200 rounded flex items-center justify-center cursor-pointer'>
                                        {state.photo ? (
                                            <Image
                                                src={URL.createObjectURL(state.photo)}
                                                width={500}
                                                height={500}
                                                alt='image'
                                                sizes='100vw'
                                                className='w-full h-full '

                                            />
                                        ) : (
                                            <span className='text-5xl'><BsCloudUpload /></span>
                                        )}
                                        <input onChange={handleChange} type="file" name='photo' accept='image/*' className='hidden' />

                                    </div>

                                </label>
                            </div>


                            <button
                                type="submit"
                                className="w-full hover:scale-105 transition-all duration-300 m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4"
                            >
                                {
                                    loading ? "Submite" : "Update"
                                }
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Notification />
        </>
    );
};

export default UserPost;
