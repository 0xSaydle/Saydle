import { NextRequest, NextResponse } from "next/server";
// import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";
import { supabaseAdmin } from "@/supabase/supabase_client";
import { v4 as uuidv4 } from "uuid";
import { auth } from "../../../../auth" 


export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${uuidv4()}-${file.name}`;

    // Upload to Supabase Storage bucket (e.g., 'uploads')
    const { error: uploadError } = await supabaseAdmin.storage
      .from("public-uploads")
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: true, // optional: overwrite if exists
      });


    if (uploadError) {
      return NextResponse.json({ message: "Error uploading to Supabase" }, { status: 500 });
    }

    // Generate public URL
    const { data: publicUrlData } = supabaseAdmin.storage
      .from("public-uploads")
      .getPublicUrl(filename);

    const { error } = await supabaseAdmin
        .from("users")
        .update({
          image: publicUrlData.publicUrl,
        })
        .eq("id", session?.user.id);
    
    if (error) {
      return NextResponse.json({ message: "Error Saving Profile picture to Supabase..." }, { status: 500 });
    }

    return NextResponse.json({
      message: "Image uploaded successfully",
      imageUrl: publicUrlData.publicUrl,
    });
  } catch (error) {
    return NextResponse.json({ message: "Unexpected error" }, { status: 500 });
  }
}
