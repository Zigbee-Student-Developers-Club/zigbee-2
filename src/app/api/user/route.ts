import { addOrUpdateUserDetails, getUserById } from "@/lib/firebase/utils";
import { authenticate } from "@/lib/middleware/authenticate";
import { UserData, validPositions } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

// add basic details - with user id
export const POST = async (req: NextRequest) => {
  try {
    const {
      name,
      profileImg,
      phoneNumber,
      batch,
      linkedInUrl,
      domain,
      about,
      position,
      feedback,
    } = await req.json();

    if (!name || !profileImg || !phoneNumber) {
      return NextResponse.json(
        { error: "Name, Profile Image and Phone Number are required." },
        { status: 400 }
      );
    }

    const authResponse = await authenticate(req);
    if (authResponse.status !== 200) return authResponse;

    const userData = req.user;

    // Validate position and role
    const userPosition = validPositions.includes(position) ? position : "";

    const userDetails: Partial<UserData> = {
      name,
      profileImg,
      phoneNumber,
      batch: batch || "",
      linkedInUrl: linkedInUrl || "",
      domain: domain || "",
      about: about || "",
      feedback: feedback || "",
      position: userPosition,
      role: "guest",
      isContributor: false,
      isAdmin: false,
    };

    const { result, error } = await addOrUpdateUserDetails(
      userData.id,
      userDetails,
      false
    );

    if (error || !result) {
      return NextResponse.json(
        {
          error: error || "Failed to add user data.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "User data added successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    // console.error("Unexpected error in POST handler:", error);
    return NextResponse.json(
      {
        error:
          (error as Error).message ||
          "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
};

// update user details - with user id
export const PUT = async (req: NextRequest) => {
  try {
    const {
      name,
      profileImg,
      phoneNumber,
      batch,
      linkedInUrl,
      domain,
      about,
      position,
      feedback,
    } = await req.json();

    const authResponse = await authenticate(req);
    if (authResponse.status !== 200) return authResponse;

    const userData = req.user;

    // Validate position
    const userPosition = validPositions.includes(position) ? position : "";

    // Dynamically build userDetails with only available values
    const userDetails: Partial<UserData> = {};
    if (name) userDetails.name = name;
    if (profileImg) userDetails.profileImg = profileImg;
    if (phoneNumber) userDetails.phoneNumber = phoneNumber;
    if (batch) userDetails.batch = batch;
    if (linkedInUrl) userDetails.linkedInUrl = linkedInUrl;
    if (domain) userDetails.domain = domain;
    if (about) userDetails.about = about;
    if (position) userDetails.position = userPosition;
    if (feedback) userDetails.feedback = feedback;

    const { result, error } = await addOrUpdateUserDetails(
      userData.id,
      userDetails,
      false
    );

    if (error || !result) {
      return NextResponse.json(
        {
          error: error || "Failed to update user data.",
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
    // console.error("Unexpected error in PUT handler:", error);
    return NextResponse.json(
      {
        error:
          (error as Error).message ||
          "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
};

// get own details - with user id
export const GET = async (req: NextRequest) => {
  try {
    const authResponse = await authenticate(req);
    if (authResponse.status !== 200) return authResponse;

    const userData = req.user;

    const { result, error } = await getUserById(userData.id);

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
