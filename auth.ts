import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import CredentialsProvider from "next-auth/providers/credentials";
import { signJwt } from "./helpers/jwt";
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
      phone_number?: string;
      accessToken: string;
      plan?: string;
      dateOfSubscription?: string;
      nextBillingDate?: string;
      planDuration?: number;
    } & DefaultSession["user"];
  }
}

// interface CustomUser extends User {
//   phone: string;
//   accessToken: string;
//   plan?: string;
//   dateOfSubscription?: string;
//   nextBillingDate?: string;
//   planDuration?: number;
// }

interface CustomToken extends JWT {
  accessToken?: string;
  phone_number?: string;
  plan?: string;
  dateOfSubscription?: string;
  nextBillingDate?: string;
  planDuration?: number;
}

export const config: NextAuthConfig = {
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
        phone_number: {
          label: "Phone Number",
          type: "text",
          placeholder: "+1234567890",
        },
        otp: { label: "OTP", type: "text", placeholder: "123456" },
      },
      async authorize(credentials) {
        if (!credentials?.phone_number || !credentials.otp) return null;

        const { phone_number, otp } = credentials;
        
        const { data: userOtp, error } = await supabaseAdmin
          .from('otps')
          .select('*')
          .eq('phone_number', phone_number)
          .eq('otp', otp)
          .single();

        if (error || !userOtp) {
          throw new Error('Otp not found');
        }

        if (new Date(userOtp.expires_at) < new Date()) {
          throw new Error('Invalid OTP');
        }

        const { data: userData, error: fetchError } = await supabaseAdmin
          .from("users")
          .select("*")
          .eq("phone_number", phone_number)
          .single();

        if (fetchError) {
          console.error("Error fetching user data:", fetchError);
        }
        // Generate JWT token
        const accessToken = await signJwt({ id: userData._id, phone_number: userData.phone_number });

        const { error: otpError } = await supabaseAdmin
        .from('otps')
        .update({
          otp: null,
          expires_at: null,
        })
        .eq('phone_number', phone_number);

        if (otpError) {
          throw new Error("Failed to clear OTP");
        }

        return {
          id: userData.id,
          phone_number: userData.phone_number,
          accessToken,
          name: userData.name || "Saydle User",
          email: userData.email || "",
          plan: userData.plan,
          dateOfSubscription: userData.date_of_subscription,
          nextBillingDate: userData.next_billing_date,
          planDuration: userData.plan_duration,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.phone_number = user.phone_number;
        
        // Handle Google login
        if (user.email && !token.phone_number) {
          const { data: userData } = await supabaseAdmin
            .from("users")
            .select("*")
            .eq("email", user.email)
            .single();

          if (userData) {
            token.id = userData.id
            token.phone_number = userData.phone_number;
            token.accessToken = await signJwt({ id: userData.id, phone: userData.phone_number });
            token.plan = userData.plan;
            token.dateOfSubscription = userData.date_of_subscription;
            token.nextBillingDate = userData.next_billing_date;
            token.planDuration = userData.plan_duration;
          }
        }
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
          session.user.id = userData.id;
          session.user.name = userData.name;
          session.user.phone_number = userData.phone_number;
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
    async signIn(params: {
      user: User | { email?: string | null; name?: string | null };
      account: Account | null;
      email?: { verificationRequest?: boolean };
      credentials?: Record<string, any>;
    }) {
      const { user, account } = params;

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

              // console.log(insertData)

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

export const { handlers, signIn, auth, signOut } = NextAuth(config);
