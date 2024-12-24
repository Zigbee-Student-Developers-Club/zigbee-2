import { NextRequest, NextResponse } from "next/server";

export const adminOnly = async (req: NextRequest) => {
  if (!req.isAdmin) {
    return NextResponse.json(
      { error: "You are not authorized person to view this data" },
      { status: 403 }
    );
  }
  return NextResponse.next();
};
