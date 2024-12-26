import { NextRequest, NextResponse } from "next/server";
import { CustomJwtPayload, verifyToken } from "@/lib/jwt";
import { checkAdmin } from "../firebase/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export const authenticate = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    const token = session?.user?.accessToken || "";

    if (!token) {
      return NextResponse.json(
        {
          error: "Unauthorized: Authentication required",
        },
        {
          status: 401,
        }
      );
    }

    const userData = (await verifyToken(token)) as CustomJwtPayload;

    if (!userData) {
      return NextResponse.json(
        {
          error: "Invalid token",
        },
        {
          status: 401,
        }
      );
    }

    // console.log(userData);

    // if the token is expired
    if (userData.exp && userData.exp < Date.now() / 1000) {
      return NextResponse.json(
        {
          error: "Token expired",
        },
        {
          status: 401,
        }
      );
    }

    // check for admin
    const isAdmin = await checkAdmin(userData.id);

    req.user = userData;
    req.isAdmin = isAdmin || false;

    return NextResponse.next();
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message || "Internal error occurred" },
      { status: 500 }
    );
  }
};
