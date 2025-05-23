"use server";

import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/supabase/supabase_client";

import { auth } from "../../../../auth" 

// GET: Fetch user profile
export async function GET(res: NextResponse) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { data: profile, error } = await supabaseAdmin
    .from("users")
    .select("name, email, phone_number, date_of_birth, address, gender, image")
    .eq("email", session?.user.email)
    .single();


  if (error || !profile) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    name: profile.name,
    email: profile.email,
    phone_number: profile.phone_number,
    date_of_birth: profile.date_of_birth,
    address: profile.address,
    gender: profile.gender,
    image: profile.image,
  });
}

// PUT: Update user profile
export async function PUT(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, email, phone_number, date_of_birth, address, gender, image } = body;

  if (!name || !email) {
    return NextResponse.json(
      { message: "Full Name and Email are required." },
      { status: 400 }
    );
  }

  const { error } = await supabaseAdmin
    .from("users")
    .update({
      name: name,
      email,
      phone_number,
      date_of_birth,
      address,
      gender,
      image: image,
    })
    .eq("id", session?.user.id);


  if (error) {
    return NextResponse.json({ message: "Error updating profile" }, { status: 500 });
  }

  return NextResponse.json({ message: "Profile updated successfully" });
}