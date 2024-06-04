import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connect from "@/utils/config/dbConfig";
import User from "@/utils/models/auth";


export const POST = async (req: NextRequest) => {
    const { name, email, password } = await req.json();

    await connect();
    const isExisting = await User.findOne({ email });

    if (isExisting) {
        return NextResponse.json({
            success: false,
            error: true,
            message: "User already existis"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    if (!hashedPassword) {
        return NextResponse.json({
            success: false,
            error: true,
            message: "Password has been require"
        });
    }

    const newUser = new User({
        name,
        email,
        password: hashedPassword
    });

    try {
        await newUser.save();
        return NextResponse.json({
            success: true,
            error: false,
            message: "User Created successfull"
        });
    } catch (err) {
        return NextResponse.json({
            message: err,
            status: 500,
        });
    }





}