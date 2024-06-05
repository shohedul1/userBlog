"use client";
import { useSession } from "next-auth/react";
import Cart from "../../components/Cart/Cart";
import { useEffect, useState } from "react";
import { UserProfile, fetchUserProfile, fetchUserpost } from "@/utils/services";
import Link from "next/link";

export default function Dashboard() {
  const [profile, setProfile] = useState<UserProfile | undefined>(undefined);
  const [userPost, setUserPost] = useState([]);

  const { data: session, status } = useSession();
  const id = session?.user?.id;

  useEffect(() => {
    const fetchUserpostData = async () => {
      if (session && id) {
        try {
          const data = await fetchUserpost();
          const anyUserDataGet = data.filter((post: any) => post.authorId === id);
          setUserPost(anyUserDataGet);
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
    const fetchProfileData = async () => {
      if (session && id) {
        try {
          const data = await fetchUserProfile(id);
          if (data) {
            setProfile(data);
          }
        } catch (error) {
          console.error("Failed to fetch profile:", error);
        }
      }
    };

    if (status === 'authenticated' && id) {
      fetchProfileData();
    }
  }, [id, status]);



  return (
    <>
      {profile?._id === session?.user?.id && userPost.length > 0 ? (
        <div className="px-5 lg:px-20 bg-lime-50 min-h-screen w-full py-10 overflow-hidden">
          <h1 className="text-center text-xl lg:text-5xl font-medium">
            Welcome: {profile?.name}
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 py-10 w-full">
            {userPost.map((item, index) => (
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
              User created by new post
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
