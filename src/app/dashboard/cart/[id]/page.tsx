'use client';

import { UserPost, fetchSingleUserpost } from "@/utils/services";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const CartDetailes: React.FC<{ params: { id: string } }> = ({ params }) => {
    const { data: session, status } = useSession();
    const [userCart, setUserCart] = useState<UserPost | undefined>(undefined);

     
    useEffect(() => {
        const fetchSingleUser = async () => {
            const data = await fetchSingleUserpost(params.id);
            if (data) {
                setUserCart(data);
            }
        };

        if (status === 'authenticated') {
            fetchSingleUser();
        } else if (status === 'unauthenticated') {
            // Handle unauthenticated state if necessary
        }
    }, [params.id, status]);
    console.log("cartdetails",userCart);


    return (
        <div>
            {userCart?.title}
        </div>
    )
}

export default CartDetailes