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
    const batch = parseInt(searchParams.get("batch") || "", 10);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = 20;

    const { result, totalUsers, error } = await fetchUser(
      role,
      batch,
      page,
      limit
    );

    if (error) {
      console.error("Error in fetchUser:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    const totalPage = Math.ceil(totalUsers / limit);

    const users = {
      total_page: totalPage,
      current_page: page,
      previous:
        page > 1
          ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/users?page=${page - 1}`
          : null,
      next:
        page < totalPage
          ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/users?page=${page + 1}`
          : null,
      results: result,
    };

    return NextResponse.json(
      {
        users,
        message: "Users fetched successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error in GET handler:", error);
    return NextResponse.json(
      {
        error: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
};

// Create or update a user
export const POST = async (req: NextRequest) => {
  try {
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

    const authResponse = await authenticate(req);
    if (authResponse.status !== 200) return authResponse;

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
      return NextResponse.json(
        {
          error: "Failed to update user data.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "User data updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error in POST handler:", error);
    return NextResponse.json(
      {
        error: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
};
