import { seedBulkData } from "@/lib/firebase/utils";
import { authenticate } from "@/lib/middleware/authenticate";
import { adminOnly } from "@/lib/middleware/authorize";
import { validPositions, UserDataForBulk, validRoles } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { searchParams } = new URL(req.url);

        const role = searchParams.get("role") || "";

        const users: UserDataForBulk[] = await req.json();

        if (!Array.isArray(users) || users.length === 0) {
            return NextResponse.json(
                { error: "At least one user is required." },
                { status: 400 }
            );
        }

        for (const user of users) {
            const { name, email, phoneNumber, batch } = user;

            if (!name || !phoneNumber || !email || !batch) {
                return NextResponse.json(
                    { error: "Name, Email, Batch, and Phone Number are required." },
                    { status: 400 }
                );
            }
        }

        const authResponse = await authenticate(req);
        if (authResponse.status !== 200) return authResponse;

        const adminResponse = await adminOnly(req);
        if (adminResponse.status !== 200) return adminResponse;

        const userDetailsArray: UserDataForBulk[] = users.map((user) => {
            const { name, email, phoneNumber, batch, position } = user;

            // Validate position
            const userPosition = validPositions.includes(position || "") ? position : "";
            const userRole = validRoles.includes(role) ? role : "guest"

            return {
                name,
                email,
                phoneNumber,
                batch,
                position: userPosition,
                role: userRole
            };
        });

        const { result, error } = await seedBulkData(userDetailsArray);

        if (error || !result) {
            return NextResponse.json(
                { error: error || "Failed to add bulk user data." },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "Bulk user data added successfully" },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                error: (error as Error).message || "An unexpected error occurred. Please try again later.",
            },
            { status: 500 }
        );
    }
};
