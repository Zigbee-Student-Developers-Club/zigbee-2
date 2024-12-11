import { NextRequest, NextResponse } from "next/server";
import { CustomJwtPayload, verifyToken } from "@/lib/jwt";
import { checkUserRole, verifyAccessToken } from "../firebase/utils";

export const authenticate = async (req: NextRequest) => {
  const tokenCookie = req.cookies.get("x-auth-token")?.value;

  if (!tokenCookie || !tokenCookie.startsWith("Bearer ")) {
    throw Error("Token is required");
  }

  const token = tokenCookie.split("Bearer ")[1];

  try {
    const userData = (await verifyToken(token)) as CustomJwtPayload;

    if (!userData) {
      throw Error("Invalid user data");
    }

    console.log(userData);

    // if the token is expired
    if (userData.exp && userData.exp < Date.now() / 1000) {
      throw Error("Your session has expired. Please log in again.");
    }

    const { result, error } = await verifyAccessToken(token);

    if (error || !result) {
      throw Error("You are logged out. Please log in again.");
    }

    // Check user role
    const role = await (await checkUserRole(userData.id)).result;

    req.user = userData;
    req.userRole = role || "guest";

    return NextResponse.next();
  } catch (err) {
    console.error("Authenticate middleware error", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
};
