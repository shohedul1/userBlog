import connect from "@/utils/config/dbConfig";
import Userpost from "@/utils/models/Userpost";
import { NextRequest, NextResponse } from "next/server";


interface Params {
    id: string;
}
//update any single api id
export async function PUT(req: NextRequest, res: NextResponse, { params }: { params: Params }) {
    await connect();

    const id = params.id


    try {
        const body = await req.json();
        const userpost = await Userpost.findById(id);

        if (!userpost) {
            return NextResponse.json({
                status: false,
                success: false,
                error: true,
                message: "User post not found!"
            })

        }



        const updateUserpost = await Userpost.findByIdAndUpdate(
            id,
            { $set: { ...body } },
            { new: true }
        )

        return NextResponse.json({
            updateUserpost,
            status: true,
            error: false,
            seccess: true,
            message: "User POST Updata here!",
        });

    } catch (error) {
        return NextResponse.json(
            { message: "PUT error" },
            { status: 500 }
        )
    }

}


//get any single api id show
export async function GET(request: NextRequest, { params }: { params: Params }) {
    await connect(); // Ensure the database is connected

    const id = params.id;

    try {
        const user = await Userpost.findById(id);

        if (user) {
            return NextResponse.json(user, { status: 200 });
        } else {
            return NextResponse.json({ message: "User post not found", status: 404 });
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ message: "GET error", status: 500 });
    }
}


//delete any sing api id 
export async function DELETE(req: NextRequest, res: NextResponse, { params }: { params: Params }) {
    await connect();

    const id = params.id

    try {
        const userpost = await Userpost.findById(id);
        if (!userpost) {
            return NextResponse.json({
                userpost,
                status: false,
                error: true,
                seccess: false,
                message: "User not authour!",
            });

        }

        await userpost.findByIdAndDelete(id);

        return NextResponse.json({
            status: true,
            error: false,
            seccess: true,
            message: "Successfully deleted userpost"
        });

    } catch (error) {
        return NextResponse.json(
            { message: "delete error" },
            { status: 500 }
        )
    }

}

