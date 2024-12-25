import { fetchAlumni } from "@/lib/firebase/utils";
import { authenticate } from "@/lib/middleware/authenticate";
import { NextRequest, NextResponse } from "next/server";

// access by authenticate user
export const GET = async (req: NextRequest) => {
  try {
    const authResponse = await authenticate(req);
    if (authResponse.status !== 200) return authResponse;

    const { searchParams } = new URL(req.url);

    const batch = parseInt(searchParams.get("batch") || "", 10);

    const { result, error } = await fetchAlumni(batch);

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(
      {
        alumnus: result ? result : [],
        message: "Alumnus fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    // console.error("Unexpected error while fetching alumnus:", error);
    return NextResponse.json(
      {
        error:
          (error as Error).message || "Unexpected error while fetching alumnus",
      },
      { status: 500 }
    );
  }
};
