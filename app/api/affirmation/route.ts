import { auth } from "@/auth";
import { AffirmationInput, buildAffirmationPrompt, generateAffirmation } from "@/helpers/generateAffirmations";
import { supabaseAdmin } from "@/supabase/supabase_client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const session = await auth();
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = session.user.id;
        const locale = "en-US";

        const { data: userData, error } = await supabaseAdmin
            .from("users")
            .select("*")
            .eq("id", userId)
            .single();

        if (error) {
            console.error("Supabase GET error:", error);
            return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
        }
        const firstName = userData.name?.trim().split(" ")[0] || "";
        const input: AffirmationInput = {
            name: firstName,
            experienceYears: userData.experience_years,
            currentGoal: Array.isArray(userData.interests) ? userData.interests[0] : null,
            currentMood: userData.feelings,
            jobTitle: userData.job_title,
            company: userData.company,
            strengths: Array.isArray(userData.strengths) ? userData.strengths : [],
            weaknesses: Array.isArray(userData.weaknesses) ? userData.weaknesses : [],
            personalityType: userData.personally_type,
            locale: locale,
        };

        const prompt = buildAffirmationPrompt(input);
        const res = await generateAffirmation(prompt);
        console.log(res)
        return NextResponse.json({ data: res }, { status: 200 });
    } catch (error) {
        console.error("Affirmation API Error:", error);
        return NextResponse.json({ message: "Error Sending Affirmation" }, { status: 500 });
    }
}
