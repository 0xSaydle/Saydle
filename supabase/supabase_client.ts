import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const serverSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

// Helper to ensure env vars are present
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

// For client-side components ("use client" files)
// Needs NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
export function getSupabaseBrowserClient() {
  const supabaseUrl = requireEnv("SUPABASE_URL");
  const supabaseKey = requireEnv("SUPABASE_ANON_KEY");
  return createClient(supabaseUrl, supabaseKey);
}

export function getSupabaseServerClient() {
  const supabaseUrl = requireEnv("SUPABASE_URL"); // You can use this for RLS-respecting server calls
  const supabaseKey = requireEnv("SUPABASE_ANON_KEY");
  return createClient(supabaseUrl, supabaseKey);
}

// Regular client for user operations (respects RLS)
// const supabase = createClient(supabaseUrl, supabaseKey);

// For server-side API routes, NextAuth.js (auth.ts), and Server Components
// Needs NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
export function getSupabaseAdminClient() {
  // For maximum clarity and safety on server-side, I'd suggest using SUPABASE_URL
  // without NEXT_PUBLIC_ for the server admin client.
  const supabaseUrl = requireEnv("SERVER_SUPABASE_URL"); // It's generally fine for this one
  const supabaseServiceKey = requireEnv("SUPABASE_SERVICE_ROLE_KEY");
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false, // Important for server-side admin client
    },
  });
}

// Admin client for operations that need to bypass RLS
// Export a shared admin client instance for convenience
export const supabaseAdmin = createClient(
  requireEnv("SERVER_SUPABASE_URL"),
  requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
  {
    auth: { persistSession: false },
  }
);

// export { supabaseAdmin };
// export default supabase;
