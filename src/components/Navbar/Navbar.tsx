'use client';

import { signOut, useSession } from 'next-auth/react';
import { Pacifico } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const pacifico = Pacifico({ subsets: ["latin"], weight: ["400"] }); // Corrected weights


const Navbar = () => {
    const { data: session, status } = useSession();

    // Use a default imge if no avatar is found
    const imageUrl = session?.user?.image || '/food_18.png';


    const [toggle, setToggle] = useState(false);

    const handleClick = () => {
        setToggle((prev) => !prev);
    };



    return (
        <header className='w-full p-5 bg-lime-500 fixed z-40'>
            <div className='flex justify-between items-center lg:px-40 px-0'>
                <Link href={"/"} className={`${pacifico.className} text-3xl hover:text-red-400`}>WebDev</Link>
                <nav className='flex items-center gap-4'>
                    <ul className='flex gap-4'>
                        <Link href={"/blog"}>BLOG</Link>
                        <Link href={"/userpost"}>USER POST</Link>
                    </ul>
                    <div onClick={handleClick} className='relative'>
                        <Image src={imageUrl} width={50} height={50} alt='image' className='w-10 h-10 rounded-full' />
                        {toggle && (
                            <>
                                <div className='absolute bg-white text-black p-2 rounded-md left-[-50px] lg:left-[-30px] top-14'>
                                    <Link href={`/profile`} className='text-base font-bold hover:bg-gray-400 px-5 py-2 hover:text-white rounded-full'>
                                        Profile
                                    </Link>
                                    <button onClick={() => signOut({ callbackUrl: "/sigin" })} className='text-base font-bold hover:bg-gray-400 px-5 py-2 hover:text-white rounded-full'>Logout</button>
                                </div>
                            </>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;