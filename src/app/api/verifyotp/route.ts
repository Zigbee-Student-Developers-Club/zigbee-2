import { verifyOtp } from "@/lib/firebase/utils";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(null, { status: 400 });
    }

    if (otp.toString().length !== 6) {
      return NextResponse.json(null, { status: 400 });
    }

    const { result, error } = await verifyOtp(email, otp);

    if (error) {
      console.error("Error during OTP verification:", error);
      return NextResponse.json(null, { status: 500 });
    }

    if (result) {
      const { isProvidedBasicData, token } = result;

      if (!token) {
        return NextResponse.json(null, { status: 500 });
      }

      const response = NextResponse.json(
        { isProvidedBasicData },
        { status: 200 }
      );

      response.cookies.set("token", `Bearer ${token}`, {
        httpOnly: true,
        // secure: true,         // for https
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60, // 30 days
      });

      return response;
    } else {
      return NextResponse.json(null, { status: 403 });
    }
  } catch (err) {
    console.error("Unexpected error in OTP verification:", err);
    return NextResponse.json(null, { status: 500 });
  }
};
