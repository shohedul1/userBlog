'use client';
import Profiledetails from '@/components/Profiledetails/Profiledetails';
import { fetchUserProfile } from '@/utils/services';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';



const ProfilePage = () => {
    const [profile, setProfile] = useState([]);

    const { data: session, status } = useSession();
    const id = session?.user.id;

 


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
        <div>
            {
                profile && (
                    <Profiledetails profile={profile} />
                )
            }
        </div>
    );
};

export default ProfilePage;
