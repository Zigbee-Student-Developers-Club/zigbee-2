import { fetchEvents } from "@/lib/firebase/utils";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const { result, error } = await fetchEvents();

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(
      {
        events: result,
        message: "Events fetched successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    // console.error("Unexpected error while fetching events:", error);
    return NextResponse.json(
      {
        error:
          (error as Error).message || "Unexpected error while fetching events",
      },
      { status: 500 }
    );
  }
};
