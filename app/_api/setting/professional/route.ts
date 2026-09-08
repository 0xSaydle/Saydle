import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth"
import { getSupabaseAdminClient } from "../../../../supabase/supabase_client";

const supabaseAdmin = getSupabaseAdminClient();

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    console.log("Fetching profile for userId:", userId);

    const { data: userProfile, error } = await supabaseAdmin
      .from("users")
      .select("job_title, company, experience_years") // Select specific columns
      .eq("id", userId)
      .single(); // Use .single() as we expect one row

    if (error) {
      if (error.code === 'PGRST116') { // No rows found (specific Supabase error code for .single() no match)
        console.log(`No profile found for userId: ${userId}`);
        return NextResponse.json({ message: "No profile found" }, { status: 404 });
      }
      console.error("Error fetching user profile:", error);
      return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
    }

    if (!userProfile) {
        // This case might be caught by PGRST116 error already, but good for robustness
        return NextResponse.json({ message: "No profile data available" }, { status: 404 });
    }

    console.log("Fetched profile:", userProfile);
    return NextResponse.json(userProfile);

  } catch (error) {
    console.error("Unexpected error fetching profile:", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

async function saveProfile({ userId, jobTitle, company, experience }: { userId: string; jobTitle: string; company: string; experience: number; }) {
    console.log("Saving profile for userId:", userId, { jobTitle, company, experience });
    const { data, error, count } = await supabaseAdmin
        .from("users")
        .update({
            job_title: jobTitle,
            company,
            experience_years: experience,
        })
        .eq("id", userId)
        .select(); // Add .select() to get data and count

    if (error) {
        console.error("Supabase update error:", error);
        return { success: false, data: null, error: error.message }; // Include error message
    }

    if (data && data.length > 0) {
        console.log("Profile updated successfully for userId:", userId);
        return { success: true, data: data[0] };
    } else {
        console.warn("No profile found or updated for userId:", userId);
        return { success: false, data: null, error: "User profile not found or failed to match criteria." };
    }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    const data = await request.json();
    const { jobTitle, company, experience } = data;

    console.log("PUT request data received:", { jobTitle, company, experience, userId }); // Crucial logging

    // **Uncomment and strengthen validation**
    if (
      typeof jobTitle !== "string" || jobTitle === undefined || // Ensure it's a string, not undefined
      typeof company !== "string" || company === undefined ||   // Ensure it's a string, not undefined
      typeof experience !== "number" || experience === undefined || // Ensure it's a number, not undefined
      !userId
    ){
      // Log the specific missing/invalid fields for debugging
      const missingFields = {
          jobTitle: typeof jobTitle !== "string" ? `Invalid type (${typeof jobTitle})` : (jobTitle === undefined ? 'undefined' : null),
          company: typeof company !== "string" ? `Invalid type (${typeof company})` : (company === undefined ? 'undefined' : null),
          experience: typeof experience !== "number" ? `Invalid type (${typeof experience})` : (experience === undefined ? 'undefined' : null),
          userId: !userId ? 'missing' : null,
      };
      console.error("Validation failed for PUT request:", missingFields);
      return NextResponse.json({ error: "Invalid or Missing fields", details: missingFields }, { status: 400 });
    }

    const result = await saveProfile({ userId, jobTitle, company, experience });
    if (!result.success) {
      // Use the error from saveProfile
      return NextResponse.json({ error: result.error || "Failed to save profile"}, {status: 404 });
    }

    return NextResponse.json({ message: "Profile saved successfully", profile: result.data });
  } catch (error) {
    console.error("Error saving profile:", error);
    return NextResponse.json({ error: "Failed to save profile" }, { status: 500 });
  }
}