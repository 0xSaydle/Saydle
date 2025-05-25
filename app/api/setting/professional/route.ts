import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/supabase/supabase_client";
import { auth } from "../../../../auth" 


async function saveProfile({ userId, jobTitle, company, experience }: { userId: string; jobTitle: string; company: string; experience: number; }) {
    console.log("Saving profile:", { userId, jobTitle, company, experience });
    const { error } = await supabaseAdmin
        .from("users")
        .update({
            job_title: jobTitle,
            company,
            experience_years: experience,
        })
        .eq("id", userId);
    if (error){
        console.log(error)
        return false;
    }
    
    return true;
}

export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    console.log(data)

    const { jobTitle, company, experience } = data;
    const userId = session?.user.id
    
    // if (
    //   typeof jobTitle !== "string" ||
    //   typeof company !== "string" ||
    //   typeof experience !== "number" ||
    //   !userId
    // ){
    //   return NextResponse.json({ error: "Invalid or Missing fields" }, { status: 400 });
    // }

    const saved = await saveProfile({ userId, jobTitle, company, experience });
    if (!saved) {
      return NextResponse.json({ error: "failed to save profile"}, {status: 505 })
    }
    return NextResponse.json({ message: "Profile saved successfully" });
  } catch (error) {
    console.error("Error saving profile:", error);
    return NextResponse.json({ error: "Failed to save profile" }, { status: 500 });
  }
}
