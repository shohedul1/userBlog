'use client';

import Navbar from '@/components/Navbar/Navbar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === 'loading') {
        return;
    } else if (!session) {
        router.push("/sigin");
    }



    return (
        <div>
            <div className='pb-20'>
                <Navbar />
            </div>
            {children}
        </div>
    );
};

export default Layout;