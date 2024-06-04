'use client';

import Navbar from '@/components/Navbar/Navbar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'loading') {
            return;
        } else if (!session) {
            router.push("/");
        }
    }, [session, status])



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