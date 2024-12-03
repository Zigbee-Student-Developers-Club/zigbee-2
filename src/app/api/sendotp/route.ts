import { sendOtp } from "@/lib/firebase/utils";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(null, { status: 400 });
        }

        const { result, error } = await sendOtp(email);

        if (error) {
            console.error("Error in sendOtp:", error);
            return NextResponse.json(null, { status: 500 });
        }

        if (!result) {
            return NextResponse.json(null, { status: 422 }); // 422 - Unprocessable Entity
        }

        return NextResponse.json(null, { status: 200 });
    } catch (err) {
        console.error("Unexpected error in POST handler:", err);
        return NextResponse.json(null, { status: 500 });
    }
};
