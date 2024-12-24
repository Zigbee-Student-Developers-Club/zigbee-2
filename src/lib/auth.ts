import { DefaultSession, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyEmailOtp } from "@/lib/axios/allApiCall";
import { AdapterUser } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        otp: { label: "OTP", type: "text" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.otp) {
          throw new Error("Email and OTP are required");
        }

        try {
          const response = await verifyEmailOtp(
            credentials.email,
            credentials.otp
          );

          if (response) {
            return {
              id: credentials.email,
              isProvidedBasicData: response.isProvidedBasicData,
              isAdmin: response.isAdmin,
              accessToken: response.token,
              name: response.name,
              image: response.profileImg,
            };
          }

          throw new Error("Failed to verify OTP. Try again.");
        } catch (error) {
          throw new Error(
            (error as Error).message ||
              "Unexpected error during OTP verification"
          );
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET || "s3cr3t",
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    jwt: async ({ token, trigger, session, user }) => {
      if (user) {
        const myUser = user as User;
        token.isProvidedBasicData = myUser.isProvidedBasicData;
        token.isAdmin = myUser.isAdmin;
        token.accessToken = myUser.accessToken;
      }
      if (trigger === "update") {
        if (session?.user) {
          // update your token whatever you like
          token.isProvidedBasicData = session.user.isProvidedBasicData;
        }
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.isProvidedBasicData = token.isProvidedBasicData as boolean;
        session.user.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

// Type Augmentation for NextAuth
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
    isAdmin: boolean;
    accessToken: string;
  }
}

// Interface for extended user data
interface User extends AdapterUser {
  isProvidedBasicData: boolean;
  isAdmin: boolean;
  accessToken: string;
}
