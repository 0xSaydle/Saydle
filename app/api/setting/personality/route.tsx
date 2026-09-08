// app/api/setting/personality/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/supabase/supabase_client";
import { auth } from "@/auth";  // your auth util

// FETCH personality details
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    const { data, error } = await supabaseAdmin
      .from("users")
      .select("personality_type, strengths, weaknesses")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Supabase GET error:", error);
      return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
    }

    return NextResponse.json({
      personalityType: data.personality_type,
      strengths: data.strengths || [],
      weaknesses: data.weaknesses || [],
    });
  } catch (err) {
    console.error("API GET error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// UPDATE personality details
export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;
    const body = await request.json();

    const {
      personalityType,
      strengths,
      weaknesses,
    }: {
      personalityType: string;
      strengths: string[];
      weaknesses: string[];
    } = body;

    // Validate
    if (
      typeof personalityType !== "string" ||
      !Array.isArray(strengths) ||
      !Array.isArray(weaknesses)
    ) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from("users")
      .update({
        personality_type: personalityType,
        strengths,
        weaknesses,
      })
      .eq("id", userId);

    if (error) {
      console.error("Supabase PUT error:", error);
      return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
    }

    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("API PUT error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
