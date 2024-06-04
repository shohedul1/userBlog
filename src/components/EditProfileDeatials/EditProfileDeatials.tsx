import { deletePhoto } from '@/utils/actions/uploadActions';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import Notification from '../Notification/Notification';

const EditProfileDeatials = ({ profileEdit, params }: any) => {
    const CLOUD_NAME = "djhjt07rh";
    const UPLOAD_PRESET = "nextjs_blog_images";

    const [profileToEditState, setProfileToEditState] = useState(profileEdit);
    const [avatarToEdit, setAvatarToEdit] = useState<File | null>(null);

    const router = useRouter();

    const handleEditSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { name, designation, age, location, about } = profileToEditState;

        if (!name) {
            toast.error("Name is required");
            return;
        }

        if (avatarToEdit) {
            const maxSize = 2 * 1024 * 1024;
            if (avatarToEdit.size > maxSize) {
                toast.error("File size is too large. Please select a file under 2MB");
                return;
            }
        }

        try {
            let profileImg;
            if (avatarToEdit) {
                profileImg = await uploadImage();
                if (profileEdit?.avatar?.id) {
                    await deletePhoto(profileEdit?.avatar?.id);
                }
            } else {
                profileImg = profileEdit?.avatar;
            }

            const updateUser = {
                name,
                designation,
                age,
                location,
                about,
                avatar: profileImg
            };

            const response = await fetch(`/api/user/${params.id}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "PATCH",
                body: JSON.stringify(updateUser)
            });

            if (response.ok) {
                toast.success("User updated successfully");
                setTimeout(() => {
                    router.push("/profile");
                }, 500);
            } else {
                toast.error("Error occurred while updating user.");
            }
        } catch (error) {
            console.error("Error during profile update:", error);
        }
    };

    const uploadImage = async () => {
        if (!avatarToEdit) return;

        const formData = new FormData();
        formData.append('file', avatarToEdit);
        formData.append("upload_preset", UPLOAD_PRESET);

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                method: "POST",
                body: formData
            });

            const data = await res.json();
            return {
                id: data['public_id'],
                url: data['secure_url']
            };
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const handleCancelUploadImage = () => {
        setAvatarToEdit(null);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, files } = event.target;

        if (type === 'file' && files) {
            setAvatarToEdit(files[0]);
        } else {
            setProfileToEditState((prevState: any) => ({ ...prevState, [name]: value }));
        }
    };

    if (!profileEdit) {
        return <p>Access Denied.</p>;
    }

    const inputStyle = "mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300 placeholder:text-green-500";

    return (
        <>

            <div className="px-5 lg:px-20 my-5 ">
                <div>
                    <form onSubmit={handleEditSubmit}>
                        <h2 className="text-5xl text-center pb-20 ">Profile Update</h2>
                        {avatarToEdit ? (
                            <div className="flex justify-center items-start">
                                <Image
                                    src={URL.createObjectURL(avatarToEdit)}
                                    alt="avatar"
                                    width={0}
                                    height={0}
                                    property="true"
                                    sizes="100vw"
                                    className="w-20 h-20 rounded-full border-2 border-black"
                                />
                                <button type="button" className="text-red-700" onClick={handleCancelUploadImage}>
                                    <AiOutlineClose />
                                </button>
                            </div>
                        ) : (
                            <div className="flex justify-center">
                                {profileEdit?.avatar && profileEdit?.avatar?.url && (
                                    <div>
                                        <Image
                                            src={profileEdit?.avatar?.url || "/food_18.png"}
                                            alt="avatar"
                                            width={0}
                                            property="true"
                                            height={0}
                                            sizes="100vw"
                                            className="w-20 h-20 rounded-full border-2 border-black"
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                        <div>
                            <input
                                onChange={handleChange}
                                type="file"
                                name='newImage'
                                accept='image/*'
                                className={inputStyle}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xl font-bold">Name</label>
                            <input
                                type="text"
                                placeholder="name"
                                name="name"
                                onChange={handleChange}
                                value={profileToEditState.name || ""}
                                className={inputStyle}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xl font-bold">Designation</label>
                            <input
                                type="text"
                                placeholder="designation"
                                name="designation"
                                onChange={handleChange}
                                value={profileToEditState.designation || ""}
                                className={inputStyle}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xl font-bold">About</label>
                            <input
                                type="text"
                                placeholder="about"
                                name="about"
                                onChange={handleChange}
                                value={profileToEditState.about || ""}
                                className={inputStyle}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xl font-bold">Age</label>
                            <input
                                type="text"
                                placeholder="age"
                                name="age"
                                onChange={handleChange}
                                value={profileToEditState.age || ""}
                                className={inputStyle}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-xl font-bold">Location</label>
                            <input
                                type="text"
                                placeholder="location"
                                name="location"
                                onChange={handleChange}
                                value={profileToEditState.location || ""}
                                className={inputStyle}
                            />
                        </div>
                        <div className="space-x-5 pt-5">
                            <button type='submit' className='px-3 py-2 rounded-full border border-blue-500 hover:bg-blue-500 hover:text-white'>
                                Edit
                            </button>
                            <Link href={"/profile"} className='px-3 py-2 rounded-full border border-red-500 hover:bg-red-500 hover:text-white'>
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            <Notification />
        </>
    )
}

export default EditProfileDeatials