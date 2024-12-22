import { addResource } from "@/lib/firebase/utils";
import { authenticate } from "@/lib/middleware/authenticate";
import { adminOnly } from "@/lib/middleware/authorize";
import { ResourceType } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const authResponse = await authenticate(req);
    if (authResponse.status !== 200) return authResponse;

    const adminResponse = await adminOnly(req);
    if (adminResponse.status !== 200) return adminResponse;

    const { name, url, domain, author } = await req.json();

    if (!name || !url || !domain || !author) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const data: ResourceType = {
      name,
      url,
      domain,
      author,
      uploadedOn: new Date().toISOString(),
    };

    const { result, error } = await addResource(data);

    if (error || !result) {
      return NextResponse.json(
        { error: error ? error : "Failed to update resource" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Resource added successfully.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error while adding resource", error);
    return NextResponse.json(
      { error: "Unexpected error while adding resource." },
      { status: 500 }
    );
  }
};
