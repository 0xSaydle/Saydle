import { auth } from "@/auth";
import { AffirmationInput, buildAffirmationPrompt, generateAffirmation } from "@/helpers/generateAffirmations";
import { supabaseAdmin } from "@/supabase/supabase_client";
import { NextRequest, NextResponse } from "next/server";
import { sendViaTwilio } from "../actions/twilio_sms";


export async function GET(req: NextRequest) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // const userId = session.user.id;
        const locale = "en-US";

        // Get the current day of the week (e.g., 'Monday', 'Tuesday')
        const currentDay = new Date().toLocaleString(locale, {
            weekday: 'long'
        });

        // Get the current time in UTC, rounded to the hour (e.g., "14:00")
        // Note: Store user times in UTC to avoid timezone headaches!
        const currentHour = new Date().getUTCHours();
        const currentTimeSlot = `${String(currentHour).padStart(2, '0')}:00`; // "09:00", "17:00"
        
        console.log(`Cron job running for: ${currentDay} at ${currentTimeSlot} UTC`);

        // Find users who have preferences matching today and this hour
        const { data: usersToSend, error }  = await supabaseAdmin
            .from("user_preferences")
            .select("*, users(*)")
            .eq("days_of_week", [currentDay])
            .eq("time_of_day", currentHour)
            .eq("is_active", true)

        if (usersToSend != null && usersToSend.length === 0) {
            console.log('No users to send affirmations to at this time.');
            return NextResponse.json({ message: 'No users scheduled.' });
        }

        if (error) {
            console.error("Supabase GET error:", error);
            return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
        }

        console.log(`Found ${usersToSend.length} users to send affirmations to.`);

        const sendingPromises = usersToSend.forEach( async (userPref) =>{

            const firstName = userPref.users?.name?.trim().split(" ")[0] || "";
            const input: AffirmationInput = {
                name: firstName,
                experienceYears: userPref.users?.experience_years,
                currentGoal: Array.isArray(userPref.users?.interests) ? userPref.users?.interests[0] : null,
                currentMood: userPref.users?.feelings,
                jobTitle: userPref.users?.job_title,
                company: userPref.users?.company,
                strengths: Array.isArray(userPref.users?.strengths) ? userPref.users?.strengths : [],
                weaknesses: Array.isArray(userPref.users?.weaknesses) ? userPref.users?.weaknesses : [],
                personalityType: userPref.users?.personally_type,
                locale: locale,
            };
            const prompt = buildAffirmationPrompt(input);
            const res = await generateAffirmation(prompt);

            //Send affirmation via twilio
            const twilioResp = await sendViaTwilio(userPref.users.phone_number, res, 'text')

            console.log(res, twilioResp)
        });   

        // await Promise.all(sendingPromises);

        return NextResponse.json({ message: `Successfully sent affirmations to ${usersToSend.length} users.` });
        
    } catch (error) {
        console.error('Cron job failed:', error);
        console.error("Affirmation API Error:", error);
        return NextResponse.json({ message: "Error Sending Affirmation" }, { status: 500 });
    }
}
