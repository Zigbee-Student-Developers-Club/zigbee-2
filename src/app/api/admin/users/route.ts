import { fetchUser } from "@/lib/firebase/utils";
import { authenticate } from "@/lib/middleware/authenticate";
import { adminOnly } from "@/lib/middleware/authorize";
import { NextRequest, NextResponse } from "next/server";

// Get users - admin only
export const GET = async (req: NextRequest) => {
  try {
    const authResponse = await authenticate(req);
    if (authResponse.status !== 200) return authResponse;

    const adminResponse = await adminOnly(req);
    if (adminResponse.status !== 200) return adminResponse;

    const { searchParams } = new URL(req.url);

    const role = searchParams.get("role") || "";
    const batch = searchParams.get("batch") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = 20;

    const { result, totalUsers, error } = await fetchUser(
      role,
      batch,
      page,
      limit
    );

    if (error) {
      // console.error("Error in fetchUser:", error);
      return NextResponse.json({ error }, { status: 500 });
    }

    const totalPage = Math.ceil(totalUsers / limit);

    const users = {
      total_page: totalPage,
      current_page: page,
      previous:
        page > 1
          ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/users?page=${page - 1}`
          : null,
      next:
        page < totalPage
          ? `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/admin/users?page=${page + 1}`
          : null,
      results: result,
    };

    return NextResponse.json(
      {
        users,
        message: "Users fetched successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    // console.error("Unexpected error in GET handler:", error);
    return NextResponse.json(
      {
        error:
          (error as Error).message ||
          "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
};
