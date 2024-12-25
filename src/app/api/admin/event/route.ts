import { addEvent } from "@/lib/firebase/utils";
import { authenticate } from "@/lib/middleware/authenticate";
import { adminOnly } from "@/lib/middleware/authorize";
import { EventType } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const authResponse = await authenticate(req);
    if (authResponse.status !== 200) return authResponse;

    const adminResponse = await adminOnly(req);
    if (adminResponse.status !== 200) return adminResponse;

    const {
      topic,
      eventDateTime,
      location,
      thumbnail,
      speakers,
    }: EventType & { eventDateTime: string } = await req.json();

    if (
      !topic ||
      !eventDateTime ||
      !location ||
      !thumbnail ||
      !speakers ||
      !Array.isArray(speakers)
    ) {
      return NextResponse.json(
        { error: "All fields are required, and speakers must be an array." },
        { status: 400 }
      );
    }

    const dateTimeRegex = /^\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}$/;
    if (!dateTimeRegex.test(eventDateTime)) {
      return NextResponse.json(
        {
          error:
            "eventDateTime must be in the format DD-MM-YYYY HH:MM:SS. (24h format)",
        },
        { status: 400 }
      );
    }

    for (const speaker of speakers) {
      const { name, role, company, batch } = speaker;
      if (!name || !role || !company || typeof batch !== "number") {
        return NextResponse.json(
          {
            error:
              "Each speaker must have a name, role, company, and a valid batch.",
          },
          { status: 400 }
        );
      }
    }

    const [day, month, year, hour, minute, second] = eventDateTime
      .match(/\d+/g)!
      .map(Number);

    const isoDateTime = new Date(
      year,
      month - 1,
      day,
      hour,
      minute,
      second
    ).toISOString();

    const data: EventType = {
      topic,
      eventDate: isoDateTime,
      location,
      thumbnail,
      speakers,
    };

    const { result, error } = await addEvent(data);

    if (error || !result) {
      return NextResponse.json(
        { error: error ? error : "Failed to add event." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Event added successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error while adding event", error);
    return NextResponse.json(
      { error: "Unexpected error while adding event." },
      { status: 500 }
    );
  }
};
