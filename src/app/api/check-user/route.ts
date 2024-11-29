import { checkUserRegistered } from "@/lib/firebase/utils";
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

        const { result, error } = await checkUserRegistered(email);

        if (error) {
            console.error("Error in checkUserRegistered:", error);
            return NextResponse.json(
                {
                    error: "Failed to check user registration. Please try again later.",
                    success: false,
                },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                message: "User registration status checked successfully.",
                success: true,
                isRegistered: result,
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
