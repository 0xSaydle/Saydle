import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    // Get authenticated user
    // const {
    //   data: { user },
    //   error: userError,
    // } = await supabase.auth.getUser();

    // if (userError || !user) {
    //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    // }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${uuidv4()}-${file.name}`;

    // Upload to Supabase Storage bucket (e.g., 'uploads')
    const { error: uploadError } = await supabase.storage
      .from("uploads")
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: true, // optional: overwrite if exists
      });

    if (uploadError) {
      return NextResponse.json({ message: "Error uploading to Supabase" }, { status: 500 });
    }

    // Generate public URL
    const { data: publicUrlData } = await supabase.storage
      .from("uploads")
      .getPublicUrl(filename);

    return NextResponse.json({
      message: "Image uploaded successfully",
      imageUrl: publicUrlData.publicUrl,
    });
  } catch (error) {
    return NextResponse.json({ message: "Unexpected error" }, { status: 500 });
  }
}
