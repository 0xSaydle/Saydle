import { NextRequest, NextResponse } from "next/server";
import supabase, { supabaseAdmin } from "@/supabase/supabase_client";
import { randomUUID } from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone } = body;

    console.log("Phone number received:", phone);
    console.log("Phone number type:", typeof phone);
    console.log("Phone number length:", phone?.length);
    console.log(
      "Phone number regex test:",
      /^\+[0-9]{10,15}$/.test(phone || "")
    );

    if (!phone) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    // Check if phone number is in valid format
    if (!phone.match(/^\+[0-9]{10,15}$/)) {
      return NextResponse.json(
        {
          error:
            "Invalid phone number format. Must include country code (e.g. +1234567890)",
        },
        { status: 400 }
      );
    }

    // Format the phone number to ensure it's in the correct format
    // Some providers require the + symbol, others don't
    const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;
    console.log("Formatted phone number:", formattedPhone);

    try {
      // Use Supabase Auth to send SMS OTP
      console.log("Sending OTP to phone number:", formattedPhone);
      const { error } = await supabase.auth.signInWithOtp({
        phone: formattedPhone,
        options: {
          // Make sure to create the user if they don't exist
          shouldCreateUser: true,
          // You can add channel here if you want to use WhatsApp instead of SMS
          // channel: 'whatsapp',
        },
      });

      if (error) {
        console.error("Supabase OTP error:", error);
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);

        // Handle specific error for unsupported phone provider
        if (error.message?.includes("unsupported phone provider")) {
          return NextResponse.json(
            {
              error: "Unsupported phone provider for this number",
              details:
                "This phone number's country code is not supported by the configured SMS provider. Please check that you have properly set up an SMS provider in your Supabase project settings. Supported providers include Twilio, MessageBird, and Vonage.",
            },
            { status: 400 }
          );
        }

        return NextResponse.json(
          { error: error.message || "Failed to send OTP" },
          { status: 500 }
        );
      }

      // Check if user exists in our users table
      const { data: existingUser } = await supabase
        .from("users")
        .select("id, phone")
        .eq("phone", formattedPhone)
        .single();

      if (!existingUser) {
        // Create a new user with the phone number
        const userId = randomUUID();

        const { error: userError } = await supabaseAdmin.from("users").insert({
          id: userId,
          phone: formattedPhone,
          verified: false,
        });

        if (userError) {
          console.error("Error creating user:", userError);
          // Don't return error here, as OTP was already sent
        }
      }

      return NextResponse.json(
        {
          success: true,
          message: "OTP sent successfully",
        },
        { status: 200 }
      );
    } catch (sendError: unknown) {
      console.error("Error sending SMS OTP:", sendError);
      const errorMessage =
        sendError instanceof Error ? sendError.message : "Unknown error";
      return NextResponse.json(
        { error: "Failed to send OTP", details: errorMessage },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    console.error("Unexpected error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: "Internal server error", details: errorMessage },
      { status: 500 }
    );
  }
}
