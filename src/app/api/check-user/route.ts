import { checkUserRegistered } from "@/lib/firebase/utils";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        {
          error: "Email is required",
        },
        { status: 400 }
      );
    }

    const { result, error } = await checkUserRegistered(email);

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(
      {
        isRegistered: result,
        message: "User checked successfully",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Unexpected error in check-user POST handler:", err);
    return NextResponse.json(
      {
        error: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
};
