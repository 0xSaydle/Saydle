"use server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_ANON_KEY as string;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

// Regular client for user operations (respects RLS)
const supabase = createClient(supabaseUrl, supabaseKey);

// Admin client for operations that need to bypass RLS
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export { supabaseAdmin };
export default supabase;