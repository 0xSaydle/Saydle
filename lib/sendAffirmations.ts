// lib/sendAffirmations.ts
import dotenv from 'dotenv';
dotenv.config();

import { createClient } from "@supabase/supabase-js";
import { DateTime } from "luxon";
// Make sure this path is correct relative to lib/sendAffirmations.ts
import { AffirmationInput, generateAffirmation, buildAffirmationPrompt } from "../helpers/gemini";
import twilio from 'twilio';
import { ContentContextImpl } from 'twilio/lib/rest/content/v1/content';
import { ConversationRelaySession } from 'twilio/lib/twiml/VoiceResponse';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase URL or Key is missing from environment variables");
  throw new Error("Supabase URL or Key is missing");
}
const supabaseAdmin = createClient(supabaseUrl, supabaseKey);


// Initialize Twilio client using environment variables
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
// Corrected environment variable names for consistency
const TWILIO_ACCOUNT_AUTH_TOKEN = process.env.TWILIO_ACCOUNT_AUTH_TOKEN;
const TWILIO_ACCOUNT_PHONE_NUMBER = process.env.TWILIO_ACCOUNT_PHONE_NUMBER;
console.log("Twilio Config - SID:", TWILIO_ACCOUNT_SID, "Token:", TWILIO_ACCOUNT_AUTH_TOKEN)
console.log("Twilio Phone Number:", TWILIO_ACCOUNT_PHONE_NUMBER);

if (!TWILIO_ACCOUNT_SID || !TWILIO_ACCOUNT_AUTH_TOKEN || !TWILIO_ACCOUNT_PHONE_NUMBER) {
    console.error("Missing Twilio environment variables. Ensure TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER are set.");
    throw new Error("Missing Twilio environment variables.");
}

const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_ACCOUNT_AUTH_TOKEN);

// A list of generic "I am..." affirmations for fallback
const genericAffirmations: string[] = [
  "I am capable and strong, ready to face today's challenges.",
  "I am worthy of great things and deserving of happiness.",
  "I am resilient, able to learn and grow from every experience.",
  "I am brilliant, full of creative ideas and unique perspectives.",
  "I am enough, exactly as I am, right now.",
  "I am courageous, stepping forward with confidence and grace."
];

function getRandomGenericAffirmation(): string {
  const randomIndex = Math.floor(Math.random() * genericAffirmations.length);
  return genericAffirmations[randomIndex];
}


// Modified function to send affirmation directly via Twilio (or other channels)
async function sendAffirmation(user_id: string, affirmation: string, to_phone: string, channel: string) {
  console.log(`Attempting to send via channel: ${channel} to ${to_phone}`);

  try {
    if (channel === 'sms') {
      // Send SMS using Twilio
      const message = await twilioClient.messages.create({
        body: affirmation,
        from: TWILIO_ACCOUNT_PHONE_NUMBER, // Your Twilio phone number
        to: to_phone, // User's phone number
      });
      console.log(`SMS sent successfully to ${to_phone}, Message SID: ${message.sid}`);
      return { success: true, messageId: message.sid, channel: 'sms' };
    } else if (channel === 'whatsapp') {
      console.log(`WhatsApp channel not yet implemented.`);
      return { success: false, error: 'WhatsApp channel not implemented' };
    } else {
      console.log(`Unsupported channel: ${channel}`);
      return { success: false, error: `Unsupported channel: ${channel}` };
    }
  } catch (error: any) {
    console.error(`Failed to send via ${channel} to ${to_phone}:`, error);
    // More specific error handling for Twilio authentication
    if (error.status === 401 || error.code === 20003) {
        return { success: false, error: "Twilio Authentication Failed. Check API credentials." };
    }
    return { success: false, error: error.message || 'Error sending affirmation' };
  }
}

// Main scheduler function
export async function runScheduledSender() {
  // Get current time (UTC)
  const nowUTC = DateTime.utc();

  // Fetch users who are enabled and have preferences set
  const { data: user_preferences, error } = await supabaseAdmin
    .from("user_preferences")
    .select("*")
    .eq("active", true);

  if (error) {
    console.error("Error fetching user preferences:", error);
    return;
  }

  console.log(`Found ${user_preferences.length} active user preferences.`);

  if (!user_preferences || user_preferences.length === 0) {
    console.log("No users found to send affirmations to.");
    return;
  }

  for (const preference of user_preferences) {
    try {
      const { data: user, error: userFetchError } = await supabaseAdmin
        .from("users")
        .select("*")
        .eq("id", preference.user_id)
        .single();

      if (userFetchError) {
        console.error("Error fetching user:", userFetchError);
        continue;
      }
      if (!user) {
        console.warn(`User with ID ${preference.user_id} not found.`);
        continue;
      }

      // Convert current time to user's timezone
      const userNow = nowUTC.setZone(preference.timezone);

      // Compare preferred delivery time with user's current time (HH:mm)
      // Using a window of +/- 1 minute for delivery
      const preferred = DateTime.fromFormat(preference.time_of_day, "HH:mm:ss", { zone: preference.timezone });
      const diffInMinutes = Math.abs(userNow.diff(preferred, "minutes").minutes);

      console.log(`User ${user.id} (${user.phone_number || user.email}): Current time ${userNow.toFormat("HH:mm")}, Preferred time ${preferred.toFormat("HH:mm")}, Difference: ${diffInMinutes.toFixed(2)} minutes.`);

      if (diffInMinutes < 1) { // Trigger if within +/- 1 minute
        const firstName = user.name?.trim().split(" ")[0] || "";
        const locale = "en-US";
        const input: AffirmationInput = {
            name: firstName,
            experienceYears: user.experience_years,
            currentGoal: Array.isArray(user.interests) ? user.interests[0] : null,
            currentMood: user.feelings,
            jobTitle: user.job_title,
            company: user.company,
            strengths: Array.isArray(user.strengths) ? user.strengths : [],
            weaknesses: Array.isArray(user.weaknesses) ? user.weaknesses : [],
            personalityType: user.personally_type,
            locale: locale,
        };
        
        const prompt = buildAffirmationPrompt(input);
        
        let affirmation: string;
        try {
            // Generate affirmation with increased retries and initial delay
            affirmation = await generateAffirmation(prompt, 5, 2000); // 5 retries, starting with 2-second delay
        } catch (genError: any) {
            console.error(`Error generating affirmation for user ${user.id} after retries:`, genError);
            affirmation = getRandomGenericAffirmation(); // Fallback to a generic affirmation
            console.log(`Using generic fallback affirmation for user ${user.id}: "${affirmation}"`);
        }
        
        // Send affirmation directly using the updated sendAffirmation
        const result = await sendAffirmation(preference.user_id, affirmation, user.phone_number, preference.delivery_method);
        console.log(`Affirmation send result for ${user.phone_number}:`, result);
      }
    } catch (err: any) {
      console.error(`Error processing user ${preference.user_id}:`, err);
    }
  }
}

// IMPORTANT: Do NOT call runScheduledSender() here if this file is imported by an API route.
// The API route itself (app/api/scheduler/route.ts) should be the sole caller.
// If you run this file directly for local testing, then uncomment it.
// runScheduledSender(); // Keep commented for Vercel/Next.js API routes