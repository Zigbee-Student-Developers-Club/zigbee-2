import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyEmailOtp } from "@/lib/axios/allApiCall";
import { AdapterUser } from "next-auth/adapters";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        otp: { label: "OTP", type: "text" },
      },
      authorize: async (credentials) => {
        const { email, otp } = credentials as { email: string; otp: string };
        if (!email || !otp) {
          throw new Error("Email and OTP are required"); // Throw an error if input is missing
        }

        try {
          const response = await verifyEmailOtp({ email, otp });

          if (response?.error) {
            throw new Error(response.error); // Throw the backend error message
          }

          if (response) {
            return {
              id: email,
              isProvidedBasicData: response?.isProvidedBasicData,
              accessToken: response?.token,
              name: response?.name,
              image: response?.profileImg,
            };
          }

          throw new Error("Failed to verify OTP. Try again."); // Throw error if verification fails
        } catch (error) {
          throw new Error(
            (error as Error).message ||
              "Unexpected error occurred during OTP verification"
          ); // Handle unexpected errors
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET || "s3cr3t",
  debug: process.env.NODE_ENV === "development",
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 }, // 30 days
  callbacks: {
    jwt: async ({ token, user }) => {
      const myUser: user = user as user;
      if (user) {
        token.isProvidedBasicData = myUser?.isProvidedBasicData;
        token.accessToken = myUser?.accessToken; // Pass the token for subsequent requests
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user.isProvidedBasicData = token?.isProvidedBasicData;
      session.user.accessToken = token?.accessToken;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthOptions;

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      isProvidedBasicData: boolean;
      accessToken: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    isProvidedBasicData: boolean;
    accessToken: string;
  }
}

interface user extends AdapterUser {
  isProvidedBasicData: boolean;
  accessToken: string;
}
