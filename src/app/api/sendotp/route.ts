import { sendOtp } from "@/lib/firebase/utils";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                {
                    error: "The 'email' field is required. Please provide a valid email address.",
                    success: false,
                },
                { status: 400 }
            );
        }

        const { result, error } = await sendOtp(email);

        if (error) {
            console.error("Error in sendOtp:", error);
            return NextResponse.json(
                {
                    error: "Failed to send OTP. Please try again later.",
                    success: false,
                },
                { status: 500 }
            );
        }

        if (!result) {
            return NextResponse.json(
                {
                    error: "OTP could not be sent due to an unknown issue.",
                    success: false,
                },
                { status: 422 } // 422 - Unprocessable Entity
            );
        }

        return NextResponse.json(
            {
                message: "OTP sent successfully.",
                success: true,
            },
            { status: 200 }
        );
    } catch (err) {
        console.error("Unexpected error in POST handler:", err);
        return NextResponse.json(
            {
                error: "An unexpected error occurred while processing your request. Please try again later.",
                success: false,
            },
            { status: 500 }
        );
    }
};
