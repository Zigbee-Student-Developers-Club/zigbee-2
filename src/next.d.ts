import { JwtPayload } from "jsonwebtoken";

// Extend the NextRequest interface to add custom properties
declare module "next/server" {
  interface NextRequest {
    user: JwtPayload;
    userRole: string;
  }
}
