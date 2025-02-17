import { NextRequest, NextResponse } from "next/server";
import { signIn } from "next-auth/react";
import twilio from "twilio";
import connectDB from "../../../lib/mongo";
import Otp from "../../../lib/Otp";
import User from "../../../lib/User";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID as string,
  process.env.TWILIO_AUTH_TOKEN as string
);

// Handle POST requests
export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const body = await req.json();
    const { phoneNumber, otp } = body;

    if (!phoneNumber || !otp) {
      return NextResponse.json({ error: "Phone number and OTP are required" }, { status: 400 });
    }

    // Find the OTP in the database
    const storedOtp = await Otp.findOne({ phoneNumber, otp });

    if (!storedOtp) {
      return NextResponse.json({ error: "Invalid OTP or expired" }, { status: 400 });
    }

    // Add this part to the frontend when consuming the API:  NextAuth credentials provider
    // const result = await signIn("credentials", {
    //   redirect: false,
    //   phone: phoneNumber,
    //   otp,
    // });

    return NextResponse.json({ success: true, message: "OTP Verified", storedOtp }, { status: 200 });
  } catch (error: any) {

    if (error.code) {
      // Twilio API returned an error response
      return NextResponse.json(
        { error: "Twilio API error", details: error.message, twilioCode: error.code, status: error.status },
        { status: error.status || 500 }
      );
    } else if (error instanceof TypeError && error.message.includes("fetch failed")) {
      // Network issue (e.g., no internet connection)
      return NextResponse.json(
        { error: "Network issue", message: "Failed to connect to Twilio. Please check your internet connection." },
        { status: 503 } // Service Unavailable
      );
    } else {
      // Unknown error
      return NextResponse.json(
        { error: "Internal server error", details: error.message },
        { status: 500 }
      );
    }
  }
}
