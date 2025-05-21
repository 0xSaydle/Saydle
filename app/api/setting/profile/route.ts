import { NextRequest, NextResponse } from "next/server";
import supabase, { supabaseAdmin } from "@/supabase/supabase_client";
// import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";
import { getUserFromLocalStorage } from "../../../../lib/local_storage";
// import { IUser } from '../../../../lib/User'
import { auth } from "@/auth";

// GET: Fetch user profile
export async function GET(req: NextRequest,) {
  const session = await auth();
  console.log(session);
  return NextResponse.json({data:session});
  // const supabaseClient = createRouteHandlerClient({ cookies: () => cookies() });
  // const {
  //   data: { user },
  //   error: sessionError,
  // } = await supabaseClient.auth.getUser();

  // if (sessionError || !user) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  // const session = getUserFromLocalStorage();

  console.log(session);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { data: profile, error } = await supabaseAdmin
    .from("profiles")
    .select("full_name, email, phone, dob, address, gender, profile_picture")
    // .eq("id", session.user.id)
    .single();

  if (error || !profile) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    fullName: profile.full_name,
    email: profile.email,
    phone: profile.phone,
    dob: profile.dob,
    address: profile.address,
    gender: profile.gender,
    profilePicture: profile.profile_picture || "/default-avatar.png",
  });
}

// PUT: Update user profile
export async function PUT(req: NextRequest) {
  // const supabaseClient = createRouteHandlerClient({ cookies });
  // const {
  //   data: { user },
  //   error: sessionError,
  // } = await supabaseClient.auth.getUser();

  // if (sessionError || !user) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }
  const session = getUserFromLocalStorage();

  console.log(session);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { fullName, email, phone, dob, address, gender, profilePicture } = body;

  if (!fullName || !email) {
    return NextResponse.json(
      { message: "Full Name and Email are required." },
      { status: 400 }
    );
  }

  const { error } = await supabase.from("profiles").update({
    full_name: fullName,
    email,
    phone,
    dob,
    address,
    gender,
    profile_picture: profilePicture,
  });
  // .eq("id", user.id);

  if (error) {
    return NextResponse.json(
      { message: "Error updating profile" },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Profile updated successfully" });
}
