import { fetchUserByField } from "@/lib/firebase/utils";
import { NextResponse } from "next/server";

// access by all
export const GET = async () => {
  try {
    const { result, error } = await fetchUserByField("isContributor", true);

    if (error) {
      console.error("Error in fetching contributors:", error);
      return NextResponse.json(
        { error: "Failed to fetch contributors." },
        { status: 500 }
      );
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error while fetching contributors:", error);
    return NextResponse.json(
      { error: "Unexpected error occurred." },
      { status: 500 }
    );
  }
};
