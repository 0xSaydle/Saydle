import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "./app/lib/mongo";
import { signJwt } from "./app/lib/jwt";
import UserDoc from "./app/lib/User";
import type { JWT } from "next-auth/jwt";
import type { Session, User, DefaultSession } from "next-auth";
import Otp from "./app/lib/Otp";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
      phone?: string;
      accessToken: string;
    } & DefaultSession["user"];
  }
}

interface CustomUser extends User {
  phone: string;
  accessToken: string;
}

interface CustomToken extends JWT {
  accessToken?: string;
  phone?: string;
}

const config = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID as string,
      clientSecret: process.env.APPLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Twilio OTP",
      credentials: {
        phone: {
          label: "Phone Number",
          type: "text",
          placeholder: "+1234567890",
        },
        otp: { label: "OTP", type: "text", placeholder: "123456" },
      },
      async authorize(credentials) {
        await connectDB();

        if (!credentials?.phone || !credentials.otp) return null;

        const { phone, otp } = credentials;
        const userOtp = await Otp.findOne({ phoneNumber: phone, otp });

        if (!userOtp) throw new Error("Otp not found");

        if (userOtp.expiresAt < new Date()) throw new Error("Invalid OTP");

        const user = await UserDoc.findOne({ phone });
        // Generate JWT token
        const accessToken = signJwt({ id: user._id, phone: user.phone });

        await Otp.updateOne(
          { phoneNumber: phone },
          { $unset: { otp: "", expiresAt: "" } }
        );
        return {
          id: user._id.toString(),
          phone: user.phone,
          accessToken,
          name: user.name || "Saydle User",
          email: user.email || "",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: CustomUser }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.phone = user.phone;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: Session;
      token: CustomToken;
    }) {
      session.user.accessToken = token.accessToken as string;
      session.user.phone = token.phone;
      return session;
    },
    async redirect({ baseUrl }: { baseUrl: string }) {
      return `${baseUrl}/settings`; // Redirect to settings page after login
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
