import {
  addOrUpdateUserDetails,
  deleteUserById,
  getUserById,
} from "@/lib/firebase/utils";
import { authenticate } from "@/lib/middleware/authenticate";
import { adminOnly } from "@/lib/middleware/authorize";
import { UserData, validPositions, validRoles } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

// get user by id
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;

    const authResponse = await authenticate(req);
    if (authResponse.status !== 200) return authResponse;

    const adminResponse = await adminOnly(req);
    if (adminResponse.status !== 200) return adminResponse;

    const { result, error } = await getUserById(id);

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(
      {
        user: result,
        message: "User details fetched successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    // console.error("Unexpected error in GET handler:", error);
    return NextResponse.json(
      {
        error:
          (error as Error).message ||
          "An error occurred while fetching user details.",
      },
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
    const authResponse = await authenticate(req);
    if (authResponse.status !== 200) return authResponse;

    const adminResponse = await adminOnly(req);
    if (adminResponse.status !== 200) return adminResponse;

    const { id } = params;

    const { position, role, isAdmin, isContributor } = await req.json();

    // Prepare updated user data
    const userDetails: Partial<UserData> = {};
    if (position && validPositions.includes(position))
      userDetails.position = position || "";
    if (role && validRoles.includes(role)) userDetails.role = role || "guest";
    if (isAdmin !== undefined) userDetails.isAdmin = isAdmin;
    if (isContributor !== undefined) userDetails.isContributor = isContributor;

    const { result, error } = await addOrUpdateUserDetails(
      id,
      userDetails,
      true
    );

    if (error || !result) {
      return NextResponse.json(
        {
          error: error || "Unexpected error in updating user details.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "User details updated successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    // console.error("Unexpected error in PUT handler:", error);
    return NextResponse.json(
      {
        error:
          (error as Error).message ||
          "Unexpected error in updating user details.",
      },
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
    const authResponse = await authenticate(req);
    if (authResponse.status !== 200) return authResponse;

    const adminResponse = await adminOnly(req);
    if (adminResponse.status !== 200) return adminResponse;

    const { id } = params;

    const { result, error } = await deleteUserById(id);

    if (error || !result) {
      return NextResponse.json(
        {
          error: "Unexpected error in deleting user.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "User deleted successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    // console.error("Unexpected error in DELETE handler:", error);
    return NextResponse.json(
      {
        error: (error as Error).message || "Unexpected error in deleting user.",
      },
      { status: 500 }
    );
  }
};
