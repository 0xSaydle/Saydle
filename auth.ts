import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import AppleProvider from "next-auth/providers/apple";
import CredentialsProvider from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import type {
  Session,
  User,
  DefaultSession,
  Account,
  Profile,
} from "next-auth";
import { getSupabaseAdminClient } from "./supabase/supabase_client";
const supabaseAdmin = getSupabaseAdminClient();
import { randomUUID } from "crypto";
import { AdapterUser } from "next-auth/adapters";
import { signJwt } from "./lib/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
        id: string;
        name: string;
        email: string;
        phone_number?: string;
        accessToken: string;
        plan?: string;
        dateOfSubscription?: string;
        nextBillingDate?: string;
        planDuration?: number;
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
    // AppleProvider({
    //   clientId: process.env.APPLE_CLIENT_ID as string,
    //   clientSecret: process.env.APPLE_CLIENT_SECRET as string,
    // }),
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
          console.error("OTP not found or database error:", error);
          // throw new Error("Otp not found"); // <-- REMOVE THIS
          return null; // NextAuth expects null for authorization failure
        }

        if (new Date(userOtp.expires_at) < new Date()) {
           console.error("Expired OTP");
          // throw new Error("Invalid OTP"); // <-- REMOVE THIS
          return null;
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
          console.error("Failed to clear OTP:", otpError);
          // throw new Error("Failed to clear OTP"); // <-- REMOVE THIS
          return null; // Or handle this gracefully
        }

        return {
          id: userData.id,
          phone_number: userData.phone_number,
          accessToken,
          name: userData.name || "Saydle User",
          email: userData.email || "",
          subscribed: userData.subscribed || false,
        } as User;
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
        token.accessToken = (user as CustomUser).accessToken ?? token.accessToken; // Keep existing if new is null
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
      session.user.accessToken = token.accessToken ?? session.user.accessToken;
      session.user.phone_number = token.phone_number ?? session.user.phone_number;
      session.user.subscribed = token.subscribed ?? session.user.subscribed;
      session.user.id = (token.id as string) ?? session.user.id; // <--- IMPORTANT: Ensure session.user.id is always there
      session.user.email = (token.email as string) ?? session.user.email; // <--- IMPORTANT: Ensure session.user.email is always there

      console.log("Session Callback - Initial session.user:", session.user); // Log initial state

      if (!session?.user?.email) {
        console.log("No email found in session, skipping update");
        return session;
      }
      if (!token.id) { // Use token.id as the primary identifier
        console.log("No ID found in token, skipping user data fetch.");
        return session;
      }

      try {
        console.log("Processing session for email:", session.user.email);

        // Always fetch the latest user data from the database
        const { data: userData, error: fetchError } = await supabaseAdmin
          .from("users")
          .select("*")
          .eq("id", token.id as string)
          .single();

        if (fetchError) {
          console.error("Error fetching user data:", fetchError);
          // If Supabase fetch fails, ensure session.user.id is at least from the token
          session.user.id = (token.id as string) ?? session.user.id;
          return session;
        }

        if (userData) {
          // Update session with latest data from database
          session.user.name = userData.name;
          session.user.phone_number = userData.phone_number;
          session.user.id = userData.id; // This is the authoritative ID from your DB
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
      console.log("Session Callback - Final session.user:", session.user); // Log final state
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
          
          let userIdToReturn: string;
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
            console.log("Creating new user with email:", user.email);
            // Create new user
            const newUuid = randomUUID(); // Generate UUID once
            const { data: insertedUser, error: insertError } = await supabaseAdmin
              .from("users")
              .insert([
                {
                  id: newUuid,
                  email: user.email,
                  name: user.name || "Saydle User",
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                  verified: false,
                },
              ])
              .select("id") // Select the ID to ensure we get it back
              .single();;

            if (insertError) {
              console.error("Error creating user:", insertError);
              return false;
            }
            console.log("Successfully created new user");
            userIdToReturn = insertedUser.id; // Use the ID from the inserted user
          } else {
            console.log("User already exists with ID:", existingUser.id);
            userIdToReturn = existingUser.id; // Use the ID of the existing user
          }
          // Important: NextAuth expects the 'user' object returned by signIn to have the 'id'
          // that will be used for the JWT 'sub' claim.
          // Override the user.id provided by Google with your Supabase user ID.
          // This is a common pattern when integrating with an existing user database.
          (user as User).id = userIdToReturn; // Cast to User to allow modification if necessary

          return true; // Successfully signed in or created/updated user
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

console.log("auth.ts: Handlers object after NextAuth initialization:", handlers);
console.log("auth.ts: Handlers.GET:", handlers.GET);
console.log("auth.ts: Handlers.POST:", handlers.POST);