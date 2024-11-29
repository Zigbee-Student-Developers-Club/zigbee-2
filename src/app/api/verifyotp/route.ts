import { verifyOtp } from "@/lib/firebase/utils";
import { generateToken } from "@/lib/jwt";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { email, otp } = await req.json();

        if (!email || !otp) {
            return NextResponse.json(
                {
                    error: "Both 'email' and 'otp' are required to verify.",
                    success: false,
                },
                { status: 400 }
            );
        }

        if (otp.toString().length !== 6) {
            return NextResponse.json(
                {
                    error: "OTP must be of 6 digits.",
                    success: false,
                },
                { status: 400 }
            );
        }

        const { result, error } = await verifyOtp(email, otp);

        if (error) {
            console.error("Error during OTP verification:", error);
            return NextResponse.json(
                {
                    error: "An error occurred while verifying OTP. Please try again later.",
                    success: false,
                },
                { status: 500 }
            );
        }

        if (result) {
            const { id, isProvidedBasicData } = result;

            const authToken = generateToken(id);

            if (!authToken) {
                return NextResponse.json(
                    {
                        error: "An error occurred while generating auth token for you. Please try again later.",
                        success: false,
                    },
                    { status: 500 }
                );
            }

            return NextResponse.json(
                {
                    message: "OTP verified successfully.",
                    success: true,
                    isProvidedBasicData,
                    authToken,
                },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                {
                    message: "Invalid OTP. Please check and try again.",
                    success: false,
                },
                { status: 403 }
            );
        }

    } catch (err) {
        console.error("Unexpected error in OTP verification:", err);
        return NextResponse.json(
            {
                error: "An unexpected error occurred during OTP verification. Please try again later.",
                success: false,
            },
            { status: 500 }
        );
    }
};