import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import CredentialsProvider from "next-auth/providers/credentials";

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
import { signJwt } from "./app/api/actions/generateCheckoutUrl/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
      phone?: string;
      accessToken: string;

      subscribed?: boolean;
    } & DefaultSession["user"];
  }
}

interface CustomUser extends User {
  phone_number: string;
  accessToken: string;
  subscribed?: boolean;
}

interface CustomToken extends JWT {
  accessToken?: string;
  phone_number?: string;
  subscribed?: boolean;
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
      async authorize(
        credentials: Partial<Record<"phone" | "otp", unknown>> | undefined
      ) {
        if (!credentials?.phone || !credentials.otp) return null;

        const phone = credentials.phone as string;
        const otp = credentials.otp as string;

        const { data: userOtp, error } = await supabaseAdmin
          .from("otps")
          .select("*")
          .eq("phone_number", phone)
          .eq("otp", otp)
          .single();

        if (error || !userOtp) {
          throw new Error("Otp not found");
        }

        if (new Date(userOtp.expires_at) < new Date()) {
          throw new Error("Invalid OTP");
        }

        const { data: userData, error: fetchError } = await supabaseAdmin
          .from("users")
          .select("*")
          .eq("phone_number", phone)
          .single();

        if (fetchError) {
          console.error("Error fetching user data:", fetchError);
          return null;
        }

        // Generate JWT token
        const accessToken = await signJwt({
          id: userData.id,
          phone: userData.phone_number,
        });

        const { error: otpError } = await supabaseAdmin
          .from("otps")
          .update({
            otp: null,
            expires_at: null,
          })
          .eq("phone_number", phone);

        if (otpError) {
          throw new Error("Failed to clear OTP");
        }

        return {
          id: userData.id,
          phone_number: userData.phone_number,
          accessToken,
          name: userData.name || "Saydle User",
          email: userData.email || "",
          subscribed: userData.subscribed || false,
        };
      },
    }),
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
        token.id = (user as CustomUser).id;
        token.phone_number = (user as CustomUser).phone_number;
        token.email = (user as CustomUser).email;
        token.name = (user as CustomUser).name;
        token.subscribed = (user as CustomUser).subscribed;
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
      session.user.phone = token.phone_number;
      session.user.subscribed = token.subscribed;

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
          session.user.subscribed = userData.subscribed;
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
      if (url.startsWith("https")) return url;

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
