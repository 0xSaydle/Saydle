import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
// import { getSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    // const session = await getSession();
    // if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${file.name}`;
    const filePath = path.join(process.cwd(), "public/uploads", filename);

    await writeFile(filePath, buffer);

    const imageUrl = `/uploads/${filename}`;
    
    return NextResponse.json({ message: "Image uploaded successfully", imageUrl });
  } catch (error) {
    return NextResponse.json({ message: "Error uploading file", error }, { status: 500 });
  }
}
