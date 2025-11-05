// auth.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Temporarily remove all other imports and custom types
// from here down to the config object

const minimalConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Log the secret to ensure it's loaded
console.log("auth.ts: NEXTAUTH_SECRET is:", process.env.NEXTAUTH_SECRET ? "LOADED" : "UNDEFINED/EMPTY");
console.log("auth.ts: GOOGLE_CLIENT_ID is:", process.env.GOOGLE_CLIENT_ID ? "LOADED" : "UNDEFINED/EMPTY");

let nextAuthResult;
try {
  nextAuthResult = NextAuth(minimalConfig); // Assign to the variable declared outside
} catch (e) {
  console.error("auth.ts: ERROR during NextAuth initialization:", e);
  // If NextAuth fails, assign dummy values to prevent further errors
  nextAuthResult = {
    handlers: { GET: () => {}, POST: () => {} }, // Dummy handlers
    auth: {},
    signIn: () => Promise.resolve(""),
    signOut: () => Promise.resolve(),
  };
}

// Now, export the destructured properties from nextAuthResult (which will either be the real thing or dummy)
export const { handlers, auth, signIn, signOut } = nextAuthResult;

console.log("auth.ts: Handlers object after NextAuth initialization:", handlers);
console.log("auth.ts: Handlers.GET:", handlers.GET);
console.log("auth.ts: Handlers.POST:", handlers.POST);