import { checkUserRegistered } from "@/lib/firebase/utils";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(null, { status: 400 });
        }

        const { result, error } = await checkUserRegistered(email);

        if (error) {
            console.error("Error in checkUserRegistered:", error);
            return NextResponse.json(null, { status: 500 });
        }

        return NextResponse.json({ isRegistered: result }, { status: 200 });
    } catch (err) {
        console.error("Unexpected error in POST handler:", err);
        return NextResponse.json(null, { status: 500 });
    }
};
