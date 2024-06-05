import moment from 'moment';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IoStar } from "react-icons/io5";


const Cart = ({ item }: any) => {
    // console.log('CATRTPage', item);
    const startArray = Array.from({ length: item?.quantity }, (_, index) => (
        <span key={index} >
            <IoStar />
        </span>

    ));
    const userpostDate =moment(item?.createdAt).format('lll')    

    return (
        <>
            <div className="w-full bg-emerald-50 gap-3 flex flex-col rounded-2xl p-5 hover:scale-105 hover:shadow-lg transition-all duration-300 hover:shadow-orange-500">
                <div>
                    {userpostDate}
                </div>
                <div className="w-full h-80	">
                    <Image 
                    src={item?.image?.url} 
                    priority alt="iamge" 
                    width={500} height={500} 
                    className="w-full h-full" />
                </div>
                <div className="flex justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">{item?.title}</h1>
                        <h2 className='text-xl font-bold text-gray-400'>{item?.category}</h2>
                    </div>
                    <span className='flex  items-center text-red-400'>{startArray}</span>
                </div>
                <div className="flex items-center justify-center">
                    <Link href={`/dashboard/cart/${item?._id}`} className='px-3 py-2 bg-lime-500 rounded-full hover:scale-110 hover:border-2 hover:border-red-500'>Overview</Link>
                </div>
            </div>
        </>
    )
}

export default Cart