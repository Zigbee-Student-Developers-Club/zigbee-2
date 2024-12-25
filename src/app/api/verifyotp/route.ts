import { verifyOtp } from "@/lib/firebase/utils";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        {
          error: "Email and OTP are required.",
        },
        { status: 400 }
      );
    }

    if (otp.toString().length !== 6) {
      return NextResponse.json(
        {
          error: "OTP must be 6 digits.",
        },
        { status: 400 }
      );
    }

    const { result, error } = await verifyOtp(email, otp);

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    if (!result) {
      return NextResponse.json(
        {
          error: "Invalid email or OTP.",
        },
        { status: 401 }
      );
    }

    const { isProvidedBasicData, isAdmin, token, name, profileImg } = result;

    if (!token) {
      return NextResponse.json(
        {
          error: "Failed to generate token",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        name,
        profileImg,
        isProvidedBasicData,
        isAdmin,
        token, // Return the token for NextAuth to handle
        message: "Login successful",
      },
      { status: 200 }
    );
  } catch (err) {
    // console.error("Unexpected error in POST handler:", err);
    return NextResponse.json(
      {
        error:
          (err as Error).message ||
          "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
};
