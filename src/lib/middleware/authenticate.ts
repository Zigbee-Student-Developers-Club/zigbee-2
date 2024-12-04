import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";
import { JwtPayload } from "jsonwebtoken";
import { checkUserRole } from "../firebase/utils";

export const authenticate = async (req: NextRequest) => {
  const tokenCookie = req.cookies.get("token")?.value;

  if (!tokenCookie || !tokenCookie.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Unauthorized: No token provided", success: false },
      { status: 401 }
    );
  }

  try {
    const token = tokenCookie.split("Bearer ")[1];
    const userData = verifyToken(token) as JwtPayload;

    if (!userData.id) {
      return NextResponse.json(
        {
          error: "Unauthorized: Token does not contain a valid user ID",
          success: false,
        },
        { status: 401 }
      );
    }

    // if the token is expired
    if (userData.exp && userData.exp < Date.now() / 1000) {
      return NextResponse.json(
        { error: "Unauthorized: Token has expired", success: false },
        { status: 401 }
      );
    }

    // Check user role
    const role = await (await checkUserRole(userData.id)).result;

    req.user = userData;
    req.userRole = role || "guest";

    return NextResponse.next();
  } catch (err) {
    console.error("Authenticate middleware error", err);
    return NextResponse.json(
      { error: "Unauthorized: Invalid token", success: false },
      { status: 401 }
    );
  }
};
