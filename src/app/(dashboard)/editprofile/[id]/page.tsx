'use client';

import EditProfileDeatials from "@/components/EditProfileDeatials/EditProfileDeatials";
import { UserProfile, fetchUserProfile } from "@/utils/services";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";




const EditProfile: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { data: session, status } = useSession();
  const [profileEdit, setProfileEdit] = useState<UserProfile | undefined>(undefined);

  useEffect(() => {
    const fetchProfileData = async () => {
      const data = await fetchUserProfile(params.id);
      if (data) {
        setProfileEdit(data);
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
      {
        profileEdit && (
          <EditProfileDeatials profileEdit={profileEdit}  params={params}  />
        )
      }
    </div>
  );
};

export default EditProfile;