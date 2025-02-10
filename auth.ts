import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Apple from "next-auth/providers/apple"
import type { Provider } from "next-auth/providers";
 
// export const { handlers, auth, signIn, signOut } = NextAuth({
//   providers: [Google],
// })

const providers: Provider[] = [

  Google({
    id:"google",
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  }),
  Apple({
    clientId: process.env.FACEBOOK_CLIENT_ID as string,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
  }),
];

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  // callbacks: {
  //   async signIn({ account, profile }) {
  //     if (account && account.provider === "google") {
  //       return profile!.email_verified && profile!.email!.endsWith("@gmail.com")
  //     }
  //     return true // Do different verification for other providers that don't have `email_verified`
  //   },
  // },
})