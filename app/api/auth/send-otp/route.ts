import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";
import connectDB from "../../../lib/mongo";
import Otp from "../../../lib/Otp";
import User from "../../../lib/User";

// Initialize Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID as string,
  process.env.TWILIO_AUTH_TOKEN as string
);

function generateOTP(length: number = 6, alphanumeric: boolean = false): string {
  const digits = "0123456789";
  const alphanumericChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const characters = alphanumeric ? alphanumericChars : digits;

  let otp = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    otp += characters[randomIndex];
  }

  return otp;
}

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const body = await req.json();
    const { phoneNumber } = body;

    if (!phoneNumber) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }
    const otp = generateOTP(6, false)
    // Save OTP in MongoDB
    await Otp.create({
      phoneNumber,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 min expiry
    });

    // Send a custom OTP message with your brand name
    const response = await client.messages.create({
      body: `Your Saydle OTP is ${otp}. Do not share this code.`,
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio number
      to: phoneNumber,
    });
    let user = await User.findOne({phoneNumber});
    if (!user){
      user = await User.insertOne({
        phone: phoneNumber,
      })
    }
    return NextResponse.json({ success: true, sid: response.sid, user: user }, { status: 200 });
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
        { error: "Internal server error", details: error.message + error.code},
        { status: 500 }
      );
    }
  }
}