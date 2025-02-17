import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module 'next-auth' {
  interface User extends DefaultUser{
    phone?: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      phone?: string;
      accessToken: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    phone?: string;
  }
}
