import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { verifyToken } from "./lib/jwt";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";

const protectedRoutes = [
  "/alumni",
  "/profile",
  "/upload-profile",
  "/api/alumni",
  "/api/user",
];

const adminRoutes = ["/api/admin", "/dashboard"];

async function authenticate(req: NextRequestWithAuth) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  if (!token) {
    return { isAuthenticated: false };
  }

  // Additional token verification
  const userData = await verifyToken(token?.accessToken);
  if (!userData) {
    return { isAuthenticated: false };
  }

  return {
    isBasicDataProvided: token?.isProvidedBasicData,
    isAdmin: token?.isAdmin,
    isAuthenticated: true,
    user: userData,
  };
}

export default withAuth(async function middleware(req: NextRequestWithAuth) {
  const currentPath = req.nextUrl.pathname;

  // Authenticate user
  const { isBasicDataProvided, isAdmin, isAuthenticated, user } =
    await authenticate(req);

  if (isBasicDataProvided && currentPath === "/upload-profile") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!isAuthenticated || !user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Redirect users who haven't provided basic data
  if (!isBasicDataProvided && currentPath !== "/upload-profile") {
    return NextResponse.redirect(new URL("/upload-profile", req.url));
  }

  // Allow protected routes
  if (
    isAuthenticated &&
    protectedRoutes.some((path) => currentPath.startsWith(path))
  ) {
    console.log("protected hits");
    return NextResponse.next();
  }

  // Allow admin routes
  if (isAdmin && adminRoutes.some((path) => currentPath.startsWith(path))) {
    console.log("admin hits");
    return NextResponse.next();
  }

  // Default to redirect if no conditions match
  return NextResponse.redirect(new URL("/login", req.url));
});

export const config = {
  matcher: [
    "/alumni",
    "/profile",
    "/upload-profile",
    "/api/alumni",
    "/api/user",
    "/api/admin/:path*",
    "/dashboard",
  ],
};
