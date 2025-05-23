import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";

import type { JWT } from "next-auth/jwt";
import type {
  Session,
  User,
  DefaultSession,
  Account,
  Profile,
} from "next-auth";
import { supabaseAdmin } from "./middleware";
import { randomUUID } from "crypto";
import { AdapterUser } from "next-auth/adapters";

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
    // CredentialsProvider({
    //   id: "credentials",
    //   name: "Twilio OTP",
    //   credentials: {
    //     phone: {
    //       label: "Phone Number",
    //       type: "text",
    //       placeholder: "+1234567890",
    //     },
    //     otp: { label: "OTP", type: "text", placeholder: "123456" },
    //   },
    //   async authorize(credentials) {

    //     if (!credentials?.phone || !credentials.otp) return null;

    //     const { phone, otp } = credentials;
    //     const userOtp = await Otp.findOne({ phoneNumber: phone, otp });

    //     if (!userOtp) throw new Error("Otp not found");

    //     if (userOtp.expiresAt < new Date()) throw new Error("Invalid OTP");

    //     const user = await UserDoc.findOne({ phone });
    //     // Generate JWT token
    //     const accessToken = signJwt({ id: user._id, phone: user.phone });

    //     await Otp.updateOne(
    //       { phoneNumber: phone },
    //       { $unset: { otp: "", expiresAt: "" } }
    //     );
    //     return {
    //       id: user._id.toString(),
    //       phone: user.phone,
    //       accessToken,
    //       name: user.name || "Saydle User",
    //       email: user.email || "",
    //       plan: user.plan,
    //       dateOfSubscription: user.date_of_subscription,
    //       nextBillingDate: user.next_billing_date,
    //       planDuration: user.plan_duration,
    //     };
    //   },
    // }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async jwt(params: {
      token: JWT;
      user: User | AdapterUser;
      account?: Account | null;
      profile?: Profile;
      trigger?: "signIn" | "signUp" | "update";
      isNewUser?: boolean;
      session?: Session;
    }) {
      const { token, user } = params;
      if (user) {
        token.accessToken = (user as CustomUser).accessToken;
        token.phone = (user as CustomUser).phone;
        token.plan = (user as CustomUser).plan;
        token.dateOfSubscription = (user as CustomUser).dateOfSubscription;
        token.nextBillingDate = (user as CustomUser).nextBillingDate;
        token.planDuration = (user as CustomUser).planDuration;
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

      if (!session?.user?.email) {
        console.log("No email found in session, skipping update");
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
    async signIn({
      user,
      account,
    }: {
      user: User | AdapterUser;
      account?: Account | null;
    }) {
      if (account?.provider === "google" && user.email) {
        try {
          console.log("Attempting to create/update user:", user.email);

          // Check if user exists
          const { data: existingUser, error: fetchError } = await supabaseAdmin
            .from("users")
            .select("id")
            .eq("email", user.email)
            .single();

          if (fetchError && fetchError.code !== "PGRST116") {
            console.error("Error checking existing user:", fetchError);
            return false;
          }

          if (!existingUser) {
            console.log("Creating new user");
            // Create new user
            const { error: insertError } = await supabaseAdmin
              .from("users")
              .insert([
                {
                  id: randomUUID(),
                  email: user.email,
                  name: user.name || "Saydle User",
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                  verified: false,
                },
              ]);

            if (insertError) {
              console.error("Error creating user:", insertError);
              return false;
            }
            console.log("Successfully created new user");
          } else {
            console.log("User already exists");
          }
          return true;
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }
      return true;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
