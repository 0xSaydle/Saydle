import NextAuth from 'next-auth';
import { User } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import TwitterProvider from 'next-auth/providers/twitter';
import LinkedInProvider from 'next-auth/providers/linkedin';
import InstagramProvider from 'next-auth/providers/instagram';
import CredentialsProvider from 'next-auth/providers/credentials';
import clientPromise from '../lib/db';
import twilio from 'twilio';

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
    }),
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID!,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Twilio Authenticator',
      credentials: {
        phone: { label: 'Phone', type: 'tel' },
        token: { label: 'Token', type: 'text' },
      },
      async authorize(credentials, req) {
        if (!credentials) return null;

        const { phone, token } = credentials;

        // Fetch user from MongoDB
        const client = await clientPromise;
        const db = client.db();
        const user = await db.collection('users').findOne({ phone: phone });

        if (!user) {
          throw new Error('User not found');
        }

        try {
          // Verify Twilio token
          const verificationCheck = await twilioClient.verify.v2.services(
            process.env.TWILIO_VERIFY_SERVICE_SID!
          ).verificationChecks.create({
            to: user.phone, // Ensure the user's phone number is stored in DB
            code: token,
          });

          if (verificationCheck.status === 'approved') {
            return {
              id: user._id.toString(),
              phone: user.phone,
            } as User;
          } else {
            throw new Error('Invalid token');
          }
        } catch (error) {
          console.error('Twilio verification failed:', error);
          throw new Error('Invalid token');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.id = user?.id || null;
        token.phone = user?.phone || null;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          phone: token.phone as string,
        };
      }
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      const client = await clientPromise;
      const db = client.db();

      const existingUser = await db.collection('users').findOne({ email: user.email });
      if (!existingUser) {
        await db.collection('users').insertOne({
          phone: user.phone, // Make sure phone number is stored
          createdAt: new Date(),
        });
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
