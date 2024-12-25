import { fetchContributors } from "@/lib/firebase/utils";
import { NextResponse } from "next/server";

// access by all
export const GET = async () => {
  try {
    const { result, error } = await fetchContributors();

    if (error || !result) {
      return NextResponse.json(
        { error: "Unexpected Error while fetching contributors" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        contributors: result,
        message: "Contributors fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    // console.error("Unexpected Error while fetching contributors:", error);
    return NextResponse.json(
      {
        error:
          (error as Error).message ||
          "Unexpected Error while fetching contributors",
      },
      { status: 500 }
    );
  }
};
