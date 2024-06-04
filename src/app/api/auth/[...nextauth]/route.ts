import { authOptions } from "@/utils/authOption/authOption";
import NextAuth from "next-auth";


export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
