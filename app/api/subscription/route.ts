import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { supabaseAdmin } from "@/supabase/supabase_client";

export async function GET() {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabaseAdmin
      .from("subscriptions")
      .select("*")
      .eq("user_id", session.user.id)
      .single();

    if (error) {
      console.error("/api/subscription error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data ?? null);
  } catch (e) {
    console.error("/api/subscription unexpected error:", e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
