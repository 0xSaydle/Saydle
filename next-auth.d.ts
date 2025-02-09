import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    phone?: string;
  }

  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      phone?: string;
    };
  }
}
