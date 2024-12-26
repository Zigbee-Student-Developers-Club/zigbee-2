import { addResource } from "@/lib/firebase/utils";
import { authenticate } from "@/lib/middleware/authenticate";
import { adminOnly } from "@/lib/middleware/authorize";
import { ResourceType, validDomains } from "@/lib/types";
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

    if (validDomains.includes(domain) === false) {
      return NextResponse.json({
        error:
          "Invalid domain. Please choose from the available options. (aptitude, dsa, interview, softskills, frontend, backend, fullstack, mobile, networking, design, datascience, ai, devops, cybersecurity, blockchain, gamedev, opensource, other)",
      });
    }

    const resourceDomain = validDomains.includes(domain) ? domain : "other";

    const data: ResourceType = {
      name,
      url,
      domain: resourceDomain,
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
    // console.error("Error while adding resource", error);
    return NextResponse.json(
      {
        error:
          (error as Error).message || "Unexpected error while adding resource.",
      },
      { status: 500 }
    );
  }
};
