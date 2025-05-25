import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module 'next-auth' {
  interface User extends DefaultUser{
    phone_number?: string;
    email?: string;
    accessToken?: string;
    plan?: string;
    dateOfSubscription?: string;
    nextBillingDate?: string;
    planDuration?: number;
  }

  interface Session {
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

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    phone_number?: string;
  }
}
