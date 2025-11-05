import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient } from "../../../../supabase/supabase_client"; 

import { auth } from "../../../../auth2" 

const supabaseAdmin = getSupabaseAdminClient();

// GET: Fetch user profile
export async function GET() {
  console.log("--- API /api/setting/profile: Request received ---");

  const session = await auth();

  console.log("API /api/setting/profile: Session result from auth():", session);

  if (!session) {
    console.log("API /api/setting/profile: Session is null or undefined. Returning 401.");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  console.log("API /api/setting/profile: Session exists. User ID:", session.user.id);

  try {
    const { data: profile, error } = await supabaseAdmin
      .from("users")
      .select(`
        id, email, name, image, address, date_of_birth, gender, phone_number, subscribed, created_at, updated_at, verified
      `)
      .eq("id", session.user.id)
      .single();

    console.log("API /api/setting/profile: Supabase query result for user ID", session.user.id);
    console.log("API /api/setting/profile: Profile data:", profile);
    console.log("API /api/setting/profile: Supabase error:", error);

    if (error || !profile) {
      if (error && error.code === 'PGRST116') { // No rows found
        console.log("API /api/setting/profile: User profile not found in Supabase.");
        return NextResponse.json({ message: "Profile not found" }, { status: 404 });
      }
      console.error("API /api/setting/profile: Error fetching profile or profile not found:", error);
      return NextResponse.json({ message: "Failed to fetch profile" }, { status: 500 }); // Or a more specific error
    }

    console.log("API /api/setting/profile: Successfully fetched profile.");
    return NextResponse.json(profile, { status: 200 });

  } catch (e) {
    console.error("API /api/setting/profile: Exception caught:", e);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
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
    console.error("Supabase PUT profile error details:", error);
    return NextResponse.json({ message: "Error updating profile" }, { status: 500 });
  }

  return NextResponse.json({ message: "Profile updated successfully" });
}