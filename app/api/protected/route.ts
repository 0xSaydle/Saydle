import { NextRequest, NextResponse } from "next/server";
import { verifyJwt } from "../../lib/jwt";

export async function GET(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1];

  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const decoded = verifyJwt(token);
  if (!decoded) return NextResponse.json({ message: "Invalid token" }, { status: 403 });

  return NextResponse.json({ message: "Protected content", user: decoded });
}
