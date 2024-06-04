'use client';
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  const { data: session, status } = useSession();
  console.log(session?.user?.id);
  console.log(session)

  return (
    <button onClick={() => signOut({ callbackUrl: "/sigin" })}>
      Hello
    </button>
  );
}
