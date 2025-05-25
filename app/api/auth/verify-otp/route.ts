import { NextRequest, NextResponse } from "next/server";
import { supabase, supabaseAdmin } from "@/middleware";
import { cookies } from "next/headers";

// Handle POST requests
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone, otp } = body;

    console.log("Verifying OTP for phone:", phone);
    console.log("OTP:", otp);

    if (!phone || !otp) {
      return NextResponse.json(
        { error: "Phone number and OTP are required" },
        { status: 400 }
      );
    }

    // Format the phone number to ensure it's in the correct format
    const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;
    console.log("Formatted phone number for verification:", formattedPhone);

    // Verify OTP with Supabase Auth
    const { data, error } = await supabase.auth.verifyOtp({
      phone: formattedPhone,
      token: otp,
      type: "sms",
    });

    if (error) {
      console.error("OTP verification error:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      return NextResponse.json(
        { error: error.message || "Invalid OTP" },
        { status: 400 }
      );
    }

    if (!data.session) {
      return NextResponse.json(
        { error: "Failed to create session" },
        { status: 400 }
      );
    }

    // Get or create user in our database
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("phone", formattedPhone)
      .single();

    if (userError && userError.code !== "PGRST116") {
      // PGRST116 is "no rows returned" error
      console.error("Error fetching user:", userError);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let userId;

    if (userData) {
      userId = userData.id;

      // Update user to verified
      const { error: updateError } = await supabaseAdmin
        .from("users")
        .update({ verified: true })
        .eq("id", userId);

      if (updateError) {
        console.error("Error updating user:", updateError);
        // Continue anyway as authentication was successful
      }
    } else {
      // This should not happen as we create the user in send-otp,
      // but just in case, create the user here
      userId = data.user?.id;

      if (!userId) {
        return NextResponse.json(
          { error: "Failed to get user ID" },
          { status: 500 }
        );
      }

      const { error: createError } = await supabaseAdmin.from("users").insert({
        id: userId,
        phone: formattedPhone,
        verified: true,
      });

      if (createError) {
        console.error("Error creating user:", createError);
        // Continue anyway as authentication was successful
      }
    }

    // Set session cookie
    const cookieStore = cookies();
    (await cookieStore).set("supabase-auth-token", JSON.stringify(data), {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return NextResponse.json(
      {
        success: true,
        message: "OTP verified successfully",
        user: {
          id: userId,
          phone: formattedPhone,
          verified: true,
        },
      },
      { status: 200 }
    );
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
