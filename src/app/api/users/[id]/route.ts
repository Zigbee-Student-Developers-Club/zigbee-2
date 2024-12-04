import {
  addOrUpdateUserDetails,
  deleteUserById,
  getUserById,
} from "@/lib/firebase/utils";
import { authenticate } from "@/lib/middleware/authenticate";
import { adminOnly } from "@/lib/middleware/authorize";
import { validPositions, validRoles } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

// get user by id - own details
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    // Middleware
    const authResponse = await authenticate(req);
    if (authResponse.status !== 200) return authResponse;

    const { id } = params;

    const userData = req.user;

    if (id !== userData.id) {
      return NextResponse.json(
        { error: "Invalid Id. User not found." },
        { status: 404 }
      );
    }

    const user = await getUserById(id);

    if (!user) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Unexpected error in GET handler:", error);
    return NextResponse.json(
      { error: "Unexpected error occurred." },
      { status: 500 }
    );
  }
};

// update user - admin only
export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    // Middleware
    const authResponse = await authenticate(req);
    if (authResponse.status !== 200) return authResponse;

    const adminResponse = await adminOnly(req);
    if (adminResponse.status !== 200) return adminResponse;

    const { id } = params;

    const {
      name,
      batch,
      linkedInUrl,
      profileImg,
      domain,
      phoneNumber,
      about,
      position,
      role,
      isContributor,
    } = await req.json();

    // Prepare updated user data
    const userDetails = {
      name,
      batch,
      linkedInUrl,
      profileImg,
      domain,
      phoneNumber,
      about,
      position: validPositions.includes(position) && position,
      role: validRoles.includes(role) && role,
      isContributor: isContributor,
    };

    const { result, error } = await addOrUpdateUserDetails(
      id,
      userDetails,
      true
    );

    if (error || !result) {
      console.error("Error updating user data:", error);
      return NextResponse.json(
        { error: "Failed to update user data." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "User data updated successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error in PUT handler:", error);
    return NextResponse.json(
      { error: "Unexpected error occurred." },
      { status: 500 }
    );
  }
};

// delete user - admin only
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    // Middleware
    const authResponse = await authenticate(req);
    if (authResponse.status !== 200) return authResponse;

    const adminResponse = await adminOnly(req);
    if (adminResponse.status !== 200) return adminResponse;

    const { id } = params;

    const user = await getUserById(id);

    if (!user.result) {
      return NextResponse.json(null, { status: 404 });
    }

    const { result, error } = await deleteUserById(id);

    if (error || !result) {
      console.error("Error in deleting user:", error);
      return NextResponse.json(null, { status: 500 });
    }

    return NextResponse.json(
      { message: "User data deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error in DELETE handler:", error);
    return NextResponse.json(
      { error: "Unexpected error occurred." },
      { status: 500 }
    );
  }
};
