import { addUsersBasicDetails } from "@/lib/firebase/utils";
import { verifyToken } from "@/lib/jwt";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const {
      batch,
      phoneNumber,
      name,
      linkedInUrl,
      position,
      profileImg,
      domain,
      about,
    } = await req.json();

    if (!batch || !name || !linkedInUrl || !profileImg || !domain) {
      return NextResponse.json(
        {
          error:
            "Batch, Name, LinkedIn URL, Profile Image, and Domain fields are required.",
          success: false,
        },
        { status: 400 }
      );
    }

    // Check authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        {
          error: "Invalid authorization header. A valid token is required.",
          success: false,
        },
        { status: 401 }
      );
    }

    const token = authHeader.split("Bearer ")[1]; // Extract the token

    const data = verifyToken(token) as JwtPayload; // Verify the token

    if (!data) {
      return NextResponse.json(
        {
          error: "Invalid token. Please provide a valid token.",
          success: false,
        },
        { status: 401 }
      );
    }

    const { result, error } = await addUsersBasicDetails(data.id, {
      batch,
      name,
      position,
      linkedInUrl,
      profileImg,
      phoneNumber,
      domain,
      about,
    });

    if (error) {
      if (error === "already added") {
        return NextResponse.json(
          {
            error: "You have already provided your basic details.",
            success: false,
          },
          { status: 400 }
        );
      }

      console.error("Error updating user data:", error);
      return NextResponse.json(
        {
          error: "Failed to update user data. Please try again later.",
          success: false,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: result,
        success: true,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unexpected error in POST handler:", error);
    return NextResponse.json(
      {
        error:
          "An unexpected error occurred while processing your request. Please try again later.",
        success: false,
      },
      { status: 500 }
    );
  }
};
