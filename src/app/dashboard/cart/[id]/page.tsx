'use client';
import Notification from "@/components/Notification/Notification";
import { deletePhoto } from "@/utils/actions/uploadActions";
import { UserPost, UserProfile, fetchAllUserProfile, fetchSingleUserpost } from "@/utils/services";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoStar } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const CartDetailes: React.FC<{ params: { id: string } }> = ({ params }) => {
    const { data: session, status } = useSession();
    const [userCart, setUserCart] = useState<UserPost | undefined>(undefined);
    const [alluser, setAlluser] = useState<UserProfile[] | undefined>(undefined);
    const router = useRouter();

    useEffect(() => {
        const fetchSingleUser = async () => {
            const data = await fetchSingleUserpost(params.id);
            if (data) {
                setUserCart(data);
            }
        };

        if (status === 'authenticated') {
            fetchSingleUser();
        }
    }, [params.id, status]);

    useEffect(() => {
        const fetchUserpostData = async () => {
            try {
                const data = await fetchAllUserProfile();
                setAlluser(data);
            } catch (error) {
                console.error("Failed to fetch user profiles:", error);
            }
        };
        fetchUserpostData();
    }, []);

    const quantity = parseInt(userCart?.quantity ?? "0", 10);
    const startArray = Array.from({ length: quantity }, (_, index) => (
        <span key={index}>
            <IoStar />
        </span>
    ));

    const existingUser = alluser?.find((prev) => prev._id === userCart?.authorId);

    const handleButtonClick = () => {
        if (existingUser) {
            window.open(`mailto:${existingUser?.email}`);
        }
    };

    const handleBlogDelete = async (imgeId: any) => {
        const confirmModal = window.confirm("Are you sure you want to delete your blog?");
        try {
            if (confirmModal) {
                const response = await fetch(`/api/userpost/${params.id}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    await deletePhoto(imgeId);
                    toast.success("User post deleted successfully!", { position: "top-center" });
                    setTimeout(() => {
                        router.refresh();
                        router.push("/dashboard");
                    }, 500)
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div>
                {userCart && (
                    <div className="md:pt-10 pb-32 px-10">
                        <div className="text-[#111019] md:text-center flex justify-center items-center md:text-6xl text-4xl font-medium pb-10 md:pb-20">
                            So much more than a detail
                        </div>
                        <div className="flex flex-col justify-center gap-4 md:flex-row ">
                            <div className="bg-[#b2b3f1] h-full flex-1 w-full rounded-md overflow-hidden p-7 ">
                                {userCart?.image?.url && (
                                    <div className="w-full h-full rounded-md relative">
                                        <Image
                                            src={userCart?.image?.url}
                                            priority
                                            alt="image"
                                            width={500}
                                            height={500}
                                            className="w-full h-full object-contain rounded-md hover:scale-105"
                                        />
                                        <div className="absolute top-0 text-2xl font-bold text-lime-500">{userCart?.title}</div>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-col flex-1">
                                <div className="space-y-5">
                                    {session?.user?.id === userCart?.authorId && (
                                        <div className="flex items-center justify-center gap-5">
                                            <button className="px-3 py-2 border border-lime-600 text-black rounded-full hover:bg-lime-200 font-bold hover:scale-105 duration-200 transition-all flex items-center gap-1">
                                                <MdEdit /> Edit
                                            </button>
                                            <button
                                                onClick={() => handleBlogDelete(userCart?.image?.id)}
                                                className="px-3 py-2 border font-bold border-red-600 text-black rounded-full hover:bg-red-100 hover:scale-105 duration-200 transition-all flex items-center gap-1"
                                            >
                                                <MdDelete /> Delete
                                            </button>
                                        </div>
                                    )}
                                    <div className="flex text-red-400 items-center gap-2">
                                        <span>Rating:</span>
                                        {startArray}
                                    </div>
                                    <div className="text-[#111019] font-medium md:text-4xl text-2xl">
                                        Brand: {userCart?.brand}
                                    </div>
                                    <div className="text-xl font-medium text-gray-500">
                                        Category: {userCart?.category}
                                    </div>
                                    <div className="text-xl font-medium text-gray-500">
                                        Number: {userCart?.number}
                                    </div>
                                    <div className="md:text-xl text-[#6a6684] leading-8 md:leading-10 font-light">
                                        Description: {userCart?.description}
                                    </div>
                                    <div>
                                        <button
                                            onClick={handleButtonClick}
                                            className="rounded-full text-[#4b42ad] font-medium py-2 px-3 bg-[#eff0ff] hover:scale-110 transition-all duration-300 shadow-md hover:shadow-indigo-400/90"
                                        >
                                            Contact
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Notification />
        </>
    );
};

export default CartDetailes;
