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
import { supabaseAdmin } from "@/supabase/supabase_client";
import { getServerSession } from "next-auth/next";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
      phone?: string;
      accessToken: string;
      plan?: string;
      dateOfSubscription?: string;
      nextBillingDate?: string;
      planDuration?: number;
    } & DefaultSession["user"];
  }
}

interface CustomUser extends User {
  phone: string;
  accessToken: string;
  plan?: string;
  dateOfSubscription?: string;
  nextBillingDate?: string;
  planDuration?: number;
}

interface CustomToken extends JWT {
  accessToken?: string;
  phone?: string;
  plan?: string;
  dateOfSubscription?: string;
  nextBillingDate?: string;
  planDuration?: number;
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
          plan: user.plan,
          dateOfSubscription: user.date_of_subscription,
          nextBillingDate: user.next_billing_date,
          planDuration: user.plan_duration,
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
        token.plan = user.plan;
        token.dateOfSubscription = user.dateOfSubscription;
        token.nextBillingDate = user.nextBillingDate;
        token.planDuration = user.planDuration;
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
      session.user.plan = token.plan;
      session.user.dateOfSubscription = token.dateOfSubscription;
      session.user.nextBillingDate = token.nextBillingDate;
      session.user.planDuration = token.planDuration;

      // Only proceed if we have a valid email
      if (!session?.user?.email) {
        console.log("No email found in session, skipping Supabase update");
        return session;
      }

      try {
        console.log("Processing session for email:", session.user.email);

        // Always fetch the latest user data from the database
        const { data: userData, error: fetchError } = await supabaseAdmin
          .from("users")
          .select("*")
          .eq("email", session.user.email)
          .single();

        if (fetchError) {
          console.error("Error fetching user data:", fetchError);
          return session;
        }

        if (userData) {
          // Update session with latest data from database
          session.user.name = userData.name;
          session.user.phone = userData.phone_number;
          session.user.id = userData.id;
          session.user.plan = userData.plan;
          session.user.dateOfSubscription = userData.date_of_subscription;
          session.user.nextBillingDate = userData.next_billing_date;
          session.user.planDuration = userData.plan_duration;
        }

        // Update last sign in
        const { error: updateError } = await supabaseAdmin
          .from("users")
          .update({
            last_sign_in: new Date().toISOString(),
          })
          .eq("email", session.user.email);

        if (updateError) {
          console.error("Error updating last sign in:", updateError);
        }
      } catch (error) {
        console.error("Error in session callback:", error);
      }

      return session;
    },
    async redirect({ baseUrl, url }: { baseUrl: string; url: string }) {
      // If the URL is already an absolute URL, return it
      if (url.startsWith("http")) return url;

      // If the URL is already a full URL, return it
      if (url.startsWith("/")) return `${baseUrl}${url}`;

      // Default to dashboard
      return `${baseUrl}/dashboard`;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
