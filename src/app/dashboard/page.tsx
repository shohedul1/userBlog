"use client";
import { useSession } from "next-auth/react";
import Cart from "../../components/Cart/Cart";
import { useEffect, useState } from "react";
import { UserProfile, fetchUserProfile, fetchUserpost } from "@/utils/services";


export default function Dashboard() {
  const [profile, setProfile] = useState<UserProfile | undefined>(undefined);
  const [userPost, setUserPost] = useState([]);

  const { data: session, status } = useSession();
  const id = session?.user.id;

  useEffect(() => {
    const fetchUserpostData = async () => {
      if (session) {
        const data = await fetchUserpost();
        if (data) {
          setUserPost(data)
        }
      }
    };
    if (status === 'authenticated' && id) {

      fetchUserpostData();
    } else if (status === 'unauthenticated') {
      // Handle unauthenticated state if necessary
    }
  }, [session])



  useEffect(() => {
    const fetchProfileData = async () => {
      if (id) {
        const data = await fetchUserProfile(id);
        if (data) {
          setProfile(data);
        }
      }
    };

    if (status === 'authenticated' && id) {

      fetchProfileData();
    } else if (status === 'unauthenticated') {
      // Handle unauthenticated state if necessary
    }
  }, [id, status]);

  return (
    <>
      {
        profile ? (
          <div className="px-5 lg:px-20 bg-lime-50 h-full w-full py-10">
            <h1 className="text-center text-xl lg:text-5xl font-medium">Welcome:{profile?.name}</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 py-10 w-full">
              {
                userPost.map((item, index) => (
                  <div key={index}>
                    <Cart item={item} />
                  </div>
                ))
              }
            </div>
          </div>
        ) : (
          <div className='bg-red-200 w-full h-screen flex items-center justify-center '>
            <div className='w-full bg-black max-w-xl m-auto p-5 items-center gap-3 rounded-md flex flex-col border-2 border-red-300'>
              <h2 className='text-white text-5xl text-center'>User created new data</h2>
            </div>
          </div>
        )
      }
    </>
  );
}