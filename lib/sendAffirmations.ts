import dotenv from 'dotenv';
dotenv.config();

import { createClient } from "@supabase/supabase-js";
import { DateTime } from "luxon";
import { AffirmationInput, generateAffirmation, buildAffirmationPrompt } from "../helpers/generateAffirmations";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;
// console.log(Object.keys(process.env));
// console.log(supabaseUrl, supabaseKey)

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase URL or Key is missing from environment variables");
  process.exit(1);
}
const supabaseAdmin = createClient(supabaseUrl, supabaseKey);

// Call your Supabase Edge function to send the affirmation
async function sendAffirmation(user_id: string, affirmation: string, to_phone: string, channel: string) {
  const res = await fetch(`${supabaseUrl}/functions/v1/send-saydle-affirmations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY}`,
    },
    body: JSON.stringify({ user_id, affirmation, to_phone, channel }),
  });
  return res.json();
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

  console.log(user_preferences.length)

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
        return;
      }

      // Convert current time to user's timezone
      const userNow = nowUTC.setZone(preference.timezone);
      // console.log(userNow)

      // Compare preferred delivery time with user's current time (HH:mm)
      const preferred = DateTime.fromFormat(preference.time_of_day, "HH:mm:ss", { zone: preference.timezone });
      const diffInSeconds = Math.abs(userNow.diff(preferred, "seconds").seconds);
      console.log(preferred, diffInSeconds)
      if (diffInSeconds < 60) {
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
        // Generate affirmation using user's mood and category
        const affirmation = await generateAffirmation(prompt);
        // Send affirmation via edge function
        const result = await sendAffirmation(preference.user_id, affirmation, user.phone_number, preference.delivery_method);
        console.log(`Sent to ${user.phone_number}:`, result);
      }
    } catch (err) {
      console.error(`Error sending to user ${preference.user_id}:`, err);
    }
  }
}

// Run the scheduler
runScheduledSender();
