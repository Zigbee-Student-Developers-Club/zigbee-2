import { NextRequest, NextResponse } from "next/server";

export const authorize = async (req: NextRequest) => {
  if (!req.user) {
    return NextResponse.json(
      { error: "Unauthorized: Authentication required" },
      { status: 401 }
    );
  }
  return NextResponse.next();
};

export const adminOnly = async (req: NextRequest) => {
  if (req.userRole !== "admin") {
    return NextResponse.json(
      { error: "Forbidden: Admins only" },
      { status: 403 }
    );
  }
  return NextResponse.next();
};
