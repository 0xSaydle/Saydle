import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "../../../lib/mongo";
import { signJwt } from "../../../lib/jwt";
import UserDoc from "../../../lib/User";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { Twilio } from "twilio";
import Otp from "../../../lib/Otp";

const twilioClient = new Twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt" as const,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Twilio OTP",
      credentials: {
        phone: { label: "Phone Number", type: "text", placeholder: "+1234567890" },
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

        await Otp.updateOne({ phoneNumber: phone }, { $unset: { otp: "", expiresAt: "" } });
        return { id: user._id.toString(), phone: user.phone, accessToken, name: user.name || "Saydle User", 
          email: user.email || "", }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.phone = user.phone;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.user.accessToken = token.token as string;
      session.user.phone = token.phone;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/settings`; // Redirect to settings page after login
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { handlers } from "../../../../auth"
 
export const { GET, POST } = handlers
// export const { handlers, auth, signIn, signOut } = NextAuth({
//   // providers: [
//   //   Google({
//   //     authorization: {
//   //       params: {
//   //         prompt: "consent",
//   //         access_type: "offline",
//   //         response_type: "code",
//   //       },
//   //     },
//   //   }),
//   // ],
// })
