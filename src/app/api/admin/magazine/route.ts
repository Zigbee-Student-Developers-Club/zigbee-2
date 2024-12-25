import { addMagazine } from "@/lib/firebase/utils";
import { authenticate } from "@/lib/middleware/authenticate";
import { adminOnly } from "@/lib/middleware/authorize";
import { MagazineType } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const authResponse = await authenticate(req);
    if (authResponse.status !== 200) return authResponse;

    const adminResponse = await adminOnly(req);
    if (adminResponse.status !== 200) return adminResponse;

    const { title, url, image } = await req.json();

    if (!title || !url || !image) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const data: MagazineType = {
      title,
      url,
      image,
      uploadedOn: new Date().toISOString(),
    };

    const { result, error } = await addMagazine(data);

    if (error || !result) {
      return NextResponse.json(
        { error: error ? error : "Failed to update magazine" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Magazine added successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    // console.error("Error while adding magazine", error);
    return NextResponse.json(
      {
        error:
          (error as Error).message || "Unexpected error while adding magazine.",
      },
      { status: 500 }
    );
  }
};
