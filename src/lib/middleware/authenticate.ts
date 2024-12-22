import { NextRequest, NextResponse } from "next/server";
import { CustomJwtPayload, verifyToken } from "@/lib/jwt";
import { checkAdmin, verifyAccessToken } from "../firebase/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export const authenticate = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    const token = session?.user?.accessToken || "";

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const userData = (await verifyToken(token)) as CustomJwtPayload;

    if (!userData) {
      throw Error("Invalid user data");
    }

    // console.log(userData);

    // if the token is expired
    if (userData.exp && userData.exp < Date.now() / 1000) {
      throw Error("Your session has expired. Please log in again.");
    }

    const { result, error } = await verifyAccessToken(token);

    if (error || !result) {
      throw Error("You are logged out. Please log in again.");
    }

    // check for admin
    const isAdmin = await checkAdmin(userData.id);

    req.user = userData;
    req.isAdmin = isAdmin || false;

    return NextResponse.next();
  } catch (err) {
    console.error("Authenticate middleware error", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
};
