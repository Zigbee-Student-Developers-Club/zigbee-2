import { fetchMagazines } from "@/lib/firebase/utils";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const { result, error } = await fetchMagazines();

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(
      {
        magazines: result,
        message: "Magazines fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    // console.error("Unexpected error while fetching magazines:", error);
    return NextResponse.json(
      {
        error:
          (error as Error).message ||
          "Unexpected error while fetching magazines",
      },
      { status: 500 }
    );
  }
};
