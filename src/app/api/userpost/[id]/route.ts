import connect from "@/utils/config/dbConfig";
import Userpost from "@/utils/models/Userpost";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  id: string;
}

// Update API
export async function PUT(req: NextRequest, { params }: { params: Params }) {
  await connect();

  const id = params.id;

  try {
    const body = await req.json();
    const userpost = await Userpost.findById(id);

    if (!userpost) {
      return NextResponse.json({
        status: false,
        success: false,
        error: true,
        message: "User post not found!",
      });
    }

    const updateUserpost = await Userpost.findByIdAndUpdate(id, { $set: { ...body } }, { new: true });

    return NextResponse.json({
      updateUserpost,
      status: true,
      error: false,
      success: true,
      message: "User POST Updated!",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "PUT error" },
      { status: 500 }
    );
  }
}

// Get API
export async function GET(req: NextRequest, { params }: { params: Params }) {
  await connect();

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

// Delete API
export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  await connect();

  const id = params.id;

  try {
    const userpost = await Userpost.findById(id);
    if (!userpost) {
      return NextResponse.json({
        status: false,
        error: true,
        success: false,
        message: "User post not found!",
      });
    }

    await Userpost.findByIdAndDelete(id);

    return NextResponse.json({
      status: true,
      error: false,
      success: true,
      message: "Successfully deleted user post",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "DELETE error" },
      { status: 500 }
    );
  }
}
