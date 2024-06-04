'use client';

import Notification from '@/components/Notification/Notification';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';
import { FaGithub } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';

const initialState = {
    name: "",
    email: "",
    password: ""
};

const SigupPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [state, setState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(state),
            });
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    toast.success(data.message, {
                        position: 'top-center'
                    });
                    setState(initialState)
                    setTimeout(() => {
                        router.push('/sigin');
                    }, 5000);
                } else {
                    toast.error(data.message, {
                        position: 'top-center'
                    });
                    setState(initialState)

                }
            } else {
                toast.error("There was a problem with your request.", {
                    position: 'top-right'
                });
                setState(initialState)
            }

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setState(initialState)
        }
    };


    return (
        <>
            <div className="p-3 md:p-4 mt-20">
                <div className="w-full max-w-sm bg-black m-auto flex rounded-md flex-col p-4">
                    <h1 className="text-2xl text-white text-center">Login to your account</h1>
                    <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
                        <label htmlFor="email" className="text-white">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={state.name}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            autoComplete="email"
                            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300 placeholder:text-green-500"
                        />
                        <label htmlFor="email" className="text-white">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={state.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            autoComplete="email"
                            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300 placeholder:text-green-500"
                        />
                        <label htmlFor="password" className="text-white">Password</label>
                        <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={state.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                autoComplete="current-password"
                                className="w-full bg-slate-200 border-none outline-none placeholder:text-green-500"
                            />
                            <span
                                className="flex text-xl cursor-pointer"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <BiShow /> : <BiHide />}
                            </span>
                        </div>
                        <button
                            type="submit"
                            className={`w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4 ${loading && "opacity-50 cursor-not-allowed"}`}
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Login"}
                        </button>
                        <span className="text-center text-white text-2xl">or</span>
                        <button type="button" onClick={() => signIn("google", { callbackUrl: "/" })} className="mb-5 bg-white p-2 text-xl flex items-center gap-2 justify-center rounded-md">
                            <FcGoogle className="w-8 h-8" />
                            Google
                        </button>
                        <button type="button" onClick={() => signIn("github", { callbackUrl: "/" })} className="bg-white p-2 text-xl flex items-center gap-2 justify-center rounded-md">
                            <FaGithub className="w-8 h-8" />
                            Github
                        </button>
                    </form>

                    <p className="text-left text-sm mt-2 text-white">
                        Don&apos;t have an account?{" "}
                        <Link href="/sigin" className="text-red-500 underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
            <Notification />
        </>
    );
};

export default SigupPage;
