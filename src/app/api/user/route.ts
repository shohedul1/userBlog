import connect from "@/utils/config/dbConfig";
import User from "@/utils/models/auth";
import { NextRequest, NextResponse } from "next/server";

//get all data 
export async function GET(req: NextRequest) {
    await connect();
    try {
        const alluser = await User.find({})

        return NextResponse.json(alluser);

    } catch (error) {
        return NextResponse.json({
            message: "GET error",
            status: 500,
        });
    }
}