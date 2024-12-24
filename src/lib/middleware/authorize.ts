import { NextRequest, NextResponse } from "next/server";

export const adminOnly = async (req: NextRequest) => {
  if (!req.isAdmin) {
    return NextResponse.json(
      { error: "Forbidden: Admins only" },
      { status: 403 }
    );
  }
  return NextResponse.next();
};
