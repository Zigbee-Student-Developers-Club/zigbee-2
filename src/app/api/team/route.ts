import { fetchUserByField } from "@/lib/firebase/utils";
import { NextResponse } from "next/server";

// access by all
export const GET = async () => {
  try {
    const { result, error } = await fetchUserByField("isContributor", true);

    if (error) {
      console.error("Error in fetching contributors:", error);
      return NextResponse.json(null, { status: 500 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Error while fetching contributors:", error);
    return NextResponse.json(null, { status: 500 });
  }
};
