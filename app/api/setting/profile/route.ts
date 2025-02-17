import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";// Assuming you use authentication
import UserDoc from "../../../lib/User";
import connectDB from "../../../lib/mongo";
import { authOptions } from "../../auth/[...nextauth]/route"

export async function GET(req: NextRequest) {
    await connectDB();
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const user = await UserDoc.findOne({ 
            $or: [{ email: session.user.email }, { phone: session.user.phone }], 
        });

        if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

        return NextResponse.json({
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        dob: user.dob,
        address: user.address,
        gender: user.gender,
        profilePicture: user.profilePicture || "/default-avatar.png",
        });
    } catch (error) {
        return NextResponse.json({ message: "Error fetching profile" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    await connectDB();
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { fullName, email, phone, dob, address, gender, profilePicture } = body;

        if (!fullName || !email) {
        return NextResponse.json({ message: "Full Name and Email are required." }, { status: 400 });
        }

        await UserDoc.updateOne(
            { 
              $or: [{ email: session.user.email }, { phone: session.user.phone }] 
            }, 
            { 
              $set: { fullName, email, phone, dob, address, gender, profilePicture } 
            }
          );

        return NextResponse.json({ message: "Profile updated successfully" });
    } catch (error) {
        return NextResponse.json({ message: "Error updating profile" }, { status: 500 });
    }
}
