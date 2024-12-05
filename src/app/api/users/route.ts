import { addOrUpdateUserDetails, fetchUser } from "@/lib/firebase/utils";
import { authenticate } from "@/lib/middleware/authenticate";
import { adminOnly } from "@/lib/middleware/authorize";
import { validPositions, validRoles } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

// Get users - admin only
export const GET = async (req: NextRequest) => {
  try {
    const authResponse = await authenticate(req);
    if (authResponse.status !== 200) return authResponse;

    const adminResponse = await adminOnly(req);
    if (adminResponse.status !== 200) return adminResponse;

    const { searchParams } = new URL(req.url);

    const role = searchParams.get("role") || "";
    const batch = searchParams.get("batch") || "";

    const { result, error } = await fetchUser(role, batch);

    if (error) {
      console.error("Error in fetchUser:", error);
      return NextResponse.json(null, { status: 500 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error while fetching all users:", error);
    return NextResponse.json(null, { status: 500 });
  }
};

// Create or update a user
export const POST = async (req: NextRequest) => {
  try {
    // Middleware
    const authResponse = await authenticate(req);
    if (authResponse.status !== 200) return authResponse;

    const {
      name,
      batch,
      linkedInUrl,
      profileImg,
      domain,
      phoneNumber,
      position,
      about,
      role,
      isContributor,
    } = await req.json();

    // Validate required fields
    if (!name || !batch || !linkedInUrl || !profileImg) {
      return NextResponse.json(
        { error: "Name, Batch, LinkedIn URL and Profile Image are required." },
        { status: 400 }
      );
    }

    const userData = req.user;
    const isAdmin = req.userRole === "admin";

    // Validate position and role
    const userPosition = validPositions.includes(position) ? position : "";
    const userRole = validRoles.includes(role) ? role : "guest";

    //User data
    const userDetails = {
      name,
      batch,
      linkedInUrl,
      profileImg,
      domain: domain || "",
      phoneNumber: phoneNumber || null,
      about: about || "",
      position: isAdmin ? userPosition : "",
      role: isAdmin ? userRole : "guest",
      isContributor: isAdmin ? !!isContributor : false,
    };

    const { result, error } = await addOrUpdateUserDetails(
      isAdmin ? null : userData.id,
      userDetails,
      isAdmin
    );

    if (error || !result) {
      console.error("Error updating user data:", error);
      return NextResponse.json(null, { status: 500 });
    }

    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    console.error("Unexpected error in POST handler:", error);
    return NextResponse.json(null, { status: 500 });
  }
};
