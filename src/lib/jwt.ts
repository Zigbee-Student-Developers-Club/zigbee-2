import { JWTPayload, jwtVerify, SignJWT } from "jose";

export interface CustomJwtPayload extends JWTPayload {
  id: string;
}

const secret: string | undefined = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET environment variable is not defined");
}

const encodedKey = new TextEncoder().encode(secret);

export const generateToken = (id: string): Promise<string> => {
  return new SignJWT({ id })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(encodedKey);
};

export const verifyToken = async (token: string): Promise<CustomJwtPayload> => {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });

    if (typeof payload.id !== "string") {
      throw new Error("Invalid token payload");
    }

    return payload as CustomJwtPayload;
  } catch (error) {
    // console.error("verifyToken error", error);
    throw new Error((error as Error).message || "Failed to verify token");
  }
};
