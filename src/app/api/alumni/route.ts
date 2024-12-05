import { fetchUserByField } from "@/lib/firebase/utils";
import { authenticate } from "@/lib/middleware/authenticate";
import { NextRequest, NextResponse } from "next/server";

// access by authenticate user
export const GET = async (req: NextRequest) => {
  try {
    const authResponse = await authenticate(req);
    if (authResponse.status !== 200) return authResponse;

    const { result, error } = await fetchUserByField("role", "alumni");

    if (error) {
      console.error("Error in fetching alumnus:", error);
      return NextResponse.json(
        { error: "Failed to fetch alumnus." },
        { status: 500 }
      );
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error while fetching alumnus:", error);
    return NextResponse.json(
      { error: "Unexpected error occurred." },
      { status: 500 }
    );
  }
};
