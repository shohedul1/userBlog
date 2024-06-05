'use client';

import UserPostEdit from "@/components/UserPostEdit/UserPostEdit";
import { UserPost, fetchSingleUserpost } from "@/utils/services";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const UserPostEid: React.FC<{ params: { id: string } }> = ({ params }) => {
    const { data: session, status } = useSession();
    const [userPostEdit, setUserPostEidt] = useState<UserPost | undefined>(undefined);

    useEffect(() => {
        const fetchProfileData = async () => {
            const data = await fetchSingleUserpost(params.id);
            if (data) {
                setUserPostEidt(data);
            }
        };

        if (status === 'authenticated') {
            fetchProfileData();
        } else if (status === 'unauthenticated') {
            // Handle unauthenticated state if necessary
        }
    }, [params.id, status]);


    return (
        <div>
            <UserPostEdit userPostEdit={userPostEdit} params={params}/>
        </div>
    )
}

export default UserPostEid