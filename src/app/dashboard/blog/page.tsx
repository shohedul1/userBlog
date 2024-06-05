"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchUserpost } from "@/utils/services";
import Link from "next/link";
import Cart from "@/components/Cart/Cart";

export default function Dashboard() {
    const [userPost, setUserPost] = useState([]);
    const [randomPosts, setRandomPosts] = useState([]);

    const { data: session, status } = useSession();
    const id = session?.user?.id;

    useEffect(() => {
        const fetchUserpostData = async () => {
            if (session && id) {
                try {
                    const data = await fetchUserpost();
                    setUserPost(data);
                } catch (error) {
                    console.error("Failed to fetch user posts:", error);
                }
            }
        };

        if (status === "authenticated") {
            fetchUserpostData();
        }
    }, [session, id, status]);

    useEffect(() => {
        if (userPost.length > 0) {
            // Shuffle posts randomly
            const shuffledPosts = [...userPost].sort(() => 0.5 - Math.random());
            setRandomPosts(shuffledPosts);
        }
    }, [userPost]);

    return (
        <>
            {session?.user?.id && randomPosts.length > 0 ? (
                <div className="px-5 lg:px-20 bg-lime-50 min-h-screen w-full py-10 overflow-hidden">
                    <h1 className="text-center text-xl lg:text-5xl font-medium">
                        Welcome to all blog
                    </h1>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 py-10 w-full">
                        {randomPosts.map((item, index) => (
                            <div key={index}>
                                <Cart item={item} />
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="bg-lime-200 w-full h-screen flex items-center justify-center">
                    <div className="w-full bg-black max-w-2xl m-auto py-20 items-center gap-3 rounded-md flex flex-col border-2 border-red-300">
                        <h2 className="text-white text-5xl text-center">
                            Blog is empty
                        </h2>
                        <Link href="/dashboard/userpost" className='px-4 py-2 bg-lime-700 rounded-md hover:scale-105 transition-all divide-purple-200 text-white'>
                            USER POST
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}
