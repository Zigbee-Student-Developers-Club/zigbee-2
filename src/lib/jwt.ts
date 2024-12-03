import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  id: string;
}

export const generateToken = (id: string): string | null => {
  const secret: string | undefined = process.env.JWT_SECRET;

  try {
    if (!secret) {
      throw new Error(
        "JWT_SECRET is not defined in the environment variables."
      );
    }

    return jwt.sign({ id }, secret, {
      expiresIn: "30d",
    });
  } catch (error) {
    console.error("Error generating token:", error);
    return null;
  }
};

export const verifyToken = (token: string): CustomJwtPayload | null => {
  const secret: string | undefined = process.env.JWT_SECRET;

  try {
    if (!secret) {
      throw new Error(
        "JWT_SECRET is not defined in the environment variables."
      );
    }

    const payload = jwt.verify(token, secret) as CustomJwtPayload;
    return payload;
  } catch (error) {
    console.error("Error verifying token:", error);

    if (error instanceof jwt.TokenExpiredError) {
      console.log("Token expired");
    } else if (error instanceof jwt.JsonWebTokenError) {
      console.log("Invalid token");
    }
    return null;
  }
};
