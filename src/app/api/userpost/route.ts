import connect from '@/utils/config/dbConfig';
import Userpost from '@/utils/models/Userpost';
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    await connect();

    try {
        const body = await req.json();
        const newblog = await Userpost.create(body);

        return NextResponse.json({
            newblog,
            status: 201,
            seccess: true,
            error: false,
            message: 'user create data successfully!'
        })


    } catch (error) {
        return NextResponse.json({
            message: "POST error (create blog)"
        })
    }

}

//get all data 
export async function GET(req: NextRequest) {
    await connect();

    try {
        const userposts = await Userpost.find({})

        return NextResponse.json(userposts);

    } catch (error) {
        return NextResponse.json({
            message: "GET error",
            status: 500,
        });
    }
}