import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

const publicPaths = [
  "/",
  "/codewars",
  "/events",
  "/gallery",
  "/login",
  "/magazines",
  "/resources",
  "/team",
];
const protectedRoutes = [
  "/alumni",
  "/dashboard",
  "/profile",
  "/upload-profile",
];

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  const currentPath = req.nextUrl.pathname;

  // If the route is protected (like /alumni, /dashboard, /profile)
  if (protectedRoutes.some((path) => currentPath.startsWith(path))) {
    // If not authenticated, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Ensure the user has provided basic data before accessing certain routes
    if (token && !token.isProvidedBasicData) {
      if (currentPath !== "/upload-profile") {
        return NextResponse.redirect(new URL("/upload-profile", req.url));
      }
    }
  }
  // add for admin only routes

  // Allow the request if the user is accessing a public page
  if (publicPaths.some((path) => currentPath.startsWith(path))) {
    return NextResponse.next();
  }

  // If the user is not authenticated, redirect to login page only if the user is not already on that page
  if (currentPath !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next(); // Allow the request if none of the conditions match
}

export const config = {
  matcher: [
    "/dashboard", // Match protected routes
    "/profile", // Match protected routes
    "/upload-profile", // Match protected routes
    "/alumni", // Match protected routes
  ],
};
