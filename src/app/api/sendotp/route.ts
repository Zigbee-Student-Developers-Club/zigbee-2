import { sendOtp } from "@/lib/firebase/utils";
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

    const { result, error } = await sendOtp(email);

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    if (!result) {
      return NextResponse.json(
        {
          error: "Failed to send OTP",
        },
        { status: 422 }
      ); // 422 - Unprocessable Entity
    }

    return NextResponse.json(
      {
        message: "OTP sent successfully",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Unexpected error in sendotp POST handler:", err);
    return NextResponse.json(
      {
        error: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
};
