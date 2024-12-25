import { fetchResources } from "@/lib/firebase/utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);

    const domain = searchParams.get("domain") || undefined;

    const { result, error } = await fetchResources(domain);

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(
      {
        resources: result,
        message: "Resources fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    // console.error("Unexpected error while fetching resources:", error);
    return NextResponse.json(
      {
        error:
          (error as Error).message ||
          "Unexpected error while fetching resources",
      },
      { status: 500 }
    );
  }
};
