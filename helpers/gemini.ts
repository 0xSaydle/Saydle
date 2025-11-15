import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash", // gemini-1.5-flash is still good for context understanding
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ],
});


// Define interfaces and types once
export interface AffirmationInput {
  name?: string;
  personalityType?: string;
  strengths?: string[];
  weaknesses?: string[];
  jobTitle?: string;
  company?: string;
  experienceYears?: string | number;
  currentGoal?: string; // represents current work status/goal
  currentMood?: string; // proxy for stress level
  locale?: string; // e.g. "en-US", "en-NG", "fr-FR"
  tone?: "friendly" | "professional";
  userContext?: string; // User's detailed narrative from onboarding
}

// NOTE: The 'encouragements' and 'getRandomEncouragementByMood' functions
// are still less directly relevant for this highly contextualized approach,
// as the LLM is expected to craft the unique affirmation.
// However, I've left them in place in case you use them for other purposes
// or as a very simple fallback if userContext is completely missing.
const encouragements = {
    motivational: [
        "🚀 Keep pushing forward!",
        "💪 You’ve got this!",
        "✨ Trust the process.",
        "➡️ Keep going—you’re on the right path.",
        "🏁 Progress, not perfection.",
        "🌅 Every day is a fresh start.",
        "👣 One step at a time, you're getting closer.",
        "🐢 Even slow progress is progress.",
        "🧱 Small steps lead to big change.",
        "🏗️ Your effort is paying off.",
      ],
      selfWorth: [
        "🌟 You are enough, just as you are.",
        "🙌 You're doing amazing!",
        "🧠 You are stronger than you think.",
        "🚀 You are capable of amazing things.",
        "🎉 Be proud of your progress.",
        "🎯 Your dreams are valid.",
        "🦁 Stay strong and proud!",
        "💫 You make a difference.",
        "💡 Your potential is limitless.",
      ],
      calming: [
        "🌿 Take a deep breath, you're okay.",
        "🧘‍♀️ It's okay to rest.",
        "☁️ Let go of what you can’t control.",
        "📦 One step at a time.",
        "🍃 Breathe, relax, release.",
        "🌬️ Breathe. You’re doing your best.",
        "🤝 You are not alone in this.",
        "🌈 Light shines through you.",
        "🛤️ Don't forget how far you’ve come.",
        "💗 Stay kind to yourself.",
        "🔄 Every day is a fresh start.",
      ],
      hopeful: [
        "🌈 Better days are ahead.",
        "💡 Every moment is a fresh start.",
        "📖 Your story isn't over yet.",
        "🎈 Tomorrow brings new possibilities.",
        "☀️ Even the darkest night will end and the sun will rise.",
        "🛤️ Believe in your journey!",
        "🌠 The best is yet to come.",
        "🌱 You're growing every day.",
        "🔥 Your dedication inspires others.",
        "🛡️ You’ve overcome so much already.",
      ]
} as const;

type EncouragementCategory = keyof typeof encouragements;

const moodToCategory: Record<string, EncouragementCategory[]> = {
  stressed: ['calming', 'hopeful'],
  sad: ['selfWorth', 'hopeful'],
  unmotivated: ['motivational', 'selfWorth'],
  confident: ['motivational'],
  anxious: ['calming'],
  happy: ['motivational', 'hopeful'],
  burnout: ['calming', 'selfWorth']
};

function getRandomEncouragementByMood(mood: string | undefined): string {
  if (!mood) return "💭 Stay kind to yourself.";

  const normalizedMood = mood.toLowerCase();
  const categories = moodToCategory[normalizedMood];

  if (!categories || categories.length === 0) {
    const allMessages = Object.values(encouragements).flat();
    return allMessages[Math.floor(Math.random() * allMessages.length)];
  }

  const messages = categories.flatMap(category => encouragements[category]);
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}

export function buildAffirmationPrompt(input: AffirmationInput): string {
  const {
    name,
    personalityType,
    strengths = [],
    weaknesses = [],
    jobTitle,
    company,
    experienceYears,
    currentGoal,
    currentMood,
    locale = "en-US",
    tone = "friendly",
    userContext, // Use the new userContext field
  } = input;

  const lines: string[] = [];

  lines.push(`You are Saydle, a compassionate, insightful, and culturally aware personal coach.`);
  lines.push(`Your goal is to generate 5 short, empowering daily affirmations for a user.`);
  lines.push(`These affirmations must deeply reflect an understanding of the user's specific feelings, habits, and daily patterns as described in their context.`);
  lines.push(`The affirmations should subtly reference these details in a comforting, validating, and encouraging way.`);
  lines.push(`Each affirmation should start with "I am...", "I can...", "I am learning...", or "I am giving myself permission to...".`);
  lines.push(`Maintain a ${tone} and supportive tone, suitable for locale: ${locale}.`);
  lines.push(`Avoid generic clichés. Focus on personalized encouragement that directly addresses their unique situation.`);
  lines.push(`Use simple, direct, and easy-to-understand words.`);
  lines.push(`Format the output as a numbered list of affirmations.`);

  lines.push(`\n--- User Profile Details ---`);
  if (name) lines.push(`- Name: ${name}`);
  if (personalityType) lines.push(`- Personality type: ${personalityType}`);
  if (strengths.length) lines.push(`- Strengths: ${strengths.join(", ")}`);
  if (weaknesses.length) lines.push(`- Weaknesses: ${weaknesses.join(", ")}`);
  if (jobTitle) lines.push(`- Job Title: ${jobTitle}`);
  if (company) lines.push(`- Company: ${company}`);
  if (experienceYears) lines.push(`- Experience: ${experienceYears} years`);
  if (currentGoal) lines.push(`- Current Goal/Work Status: ${currentGoal}`);
  if (currentMood) lines.push(`- Current Mood: ${currentMood}`);

  // This is the most critical addition for the new requirement
  if (userContext) {
    lines.push(`\n--- User's Personal Context (Key for Affirmation Generation) ---`);
    lines.push(userContext);
  } else {
    // FALLBACK SCENARIO: No detailed user context provided.
    // Rely more on general profile and append a mood-based encouragement.
    lines.push(`\n--- No specific personal context provided. Generate a general affirmation based on profile. ---`);
    lines.push(`Focus on their current mood and other profile details.`);
    lines.push(`The affirmation should be 1-2 sentences.`);

    // Conditionally use the mood-based encouragement
    const tailoredEncouragement = getRandomEncouragementByMood(currentMood);
    lines.push(`After the affirmation, add a short, supportive, and related concluding phrase.`);
    lines.push(`Example concluding phrase: "${tailoredEncouragement}"`); // Show an example for guidance
    lines.push(`The entire response (affirmation + concluding phrase) should be 1-2 sentences in total.`);
  }

  lines.push(`\n--- Saydle Affirmations (5 items) ---`);
  lines.push(`Generate 5 affirmations now based on the above, reflecting deep understanding.`);

  return lines.join("\n");
}

// --- REFACPTOR START (Corrected for 1 short affirmation) ---

// export function buildAffirmationPrompt(input: AffirmationInput): string {
//   const {
//     name,
//     personalityType,
//     strengths = [],
//     weaknesses = [],
//     jobTitle,
//     company,
//     experienceYears,
//     currentGoal,
//     currentMood,
//     locale = "en-US",
//     tone = "friendly",
//     userContext, // User's detailed narrative from onboarding
//   } = input;

//   const lines: string[] = [];

//   lines.push(`You are Saydle, a compassionate, insightful, and culturally aware personal coach.`);
//   lines.push(`Your goal is to generate 5 short, empowering daily affirmations for a user.`);
//   lines.push(`Your goal is to generate ONE short, empowering daily affirmation (1-2 sentences) for a user.`);
//   lines.push(`This affirmation must demonstrate a deep understanding of the user's specific feelings, habits, and daily patterns as described in their context.`);
//   lines.push(`The affirmation should subtly reference these details in a comforting, validating, and encouraging way.`);
//   lines.push(`It should sound like it's speaking directly to their unique situation, similar to the examples provided:`);
//   lines.push(`  - "I am learning that my worth isn’t tied to how productive I am — I deserve rest even when there’s more to do."`);
//   lines.push(`  - "I am letting the quiet teach me who I’ve become."`);
//   lines.push(`The affirmation should start with "I am...", "I can...", "I am learning...", or "I am giving myself permission to...".`);
//   lines.push(`Maintain a ${tone} and supportive tone, suitable for locale: ${locale}.`);
//   lines.push(`Avoid generic clichés. Focus on personalized encouragement.`);
//   lines.push(`Use simple, direct, and easy-to-understand words.`);
//   lines.push(`Only respond with the affirmation text. Do NOT include any numbering, bullet points, or additional explanation.`);


//   lines.push(`\n--- User Profile Details ---`);
//   if (name) lines.push(`- Name: ${name}`);
//   if (personalityType) lines.push(`- Personality type: ${personalityType}`);
//   if (strengths.length) lines.push(`- Strengths: ${strengths.join(", ")}`);
//   if (weaknesses.length) lines.push(`- Weaknesses: ${weaknesses.join(", ")}`);
//   if (jobTitle) lines.push(`- Job Title: ${jobTitle}`);
//   if (company) lines.push(`- Company: ${company}`);
//   if (experienceYears) lines.push(`- Experience: ${experienceYears} years`);
//   if (currentGoal) lines.push(`- Current Goal/Work Status: ${currentGoal}`);
//   if (currentMood) lines.push(`- Current Mood: ${currentMood}`);

//   // This is the most critical input for generating the nuanced affirmation
//   if (userContext) {
//     lines.push(`\n--- User's Personal Context (Key for Affirmation Generation) ---`);
//     lines.push(userContext);
//   } else {
//     // FALLBACK SCENARIO: No detailed user context provided.
//     // Rely more on general profile and append a mood-based encouragement.
//     lines.push(`\n--- No specific personal context provided. Generate a general affirmation based on profile. ---`);
//     lines.push(`Focus on their current mood and other profile details.`);
//     lines.push(`The affirmation should be 1-2 sentences.`);

//     // Conditionally use the mood-based encouragement
//     const tailoredEncouragement = getRandomEncouragementByMood(currentMood);
//     lines.push(`After the affirmation, add a short, supportive, and related concluding phrase.`);
//     lines.push(`Example concluding phrase: "${tailoredEncouragement}"`); // Show an example for guidance
//     lines.push(`The entire response (affirmation + concluding phrase) should be 1-2 sentences in total.`);
//   }

//   lines.push(`\n--- Saydle Affirmation ---`);
//   lines.push(`Generate ONE short, personalized affirmation now, focusing on deep understanding of their situation.`);

//   return lines.join("\n");
// }

// Helper function for delay
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// The generateAffirmation function remains mostly the same,
// but expects a single string output.
export async function generateAffirmation(prompt: string, retries = 3, initialDelay = 1000): Promise<string> {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      // Ensure the text is not empty and potentially format it if needed
      if (text.trim()) {
        console.log("Generated affirmation:", text);
        return text;
      }
      console.warn("Gemini returned empty text, providing generic fallback.");
      return "I am resilient and capable, finding strength in every step."; // Single, short fallback
    } catch (error: any) {
      console.error(`Attempt ${i + 1} failed: Google Generative AI error:`, error);

      if (error.status === 503 && i < retries - 1) {
        const backoffDelay = initialDelay * Math.pow(2, i);
        console.log(`Retrying in ${backoffDelay / 1000} seconds...`);
        await delay(backoffDelay);
      } else {
        throw new Error("Failed to generate affirmation using Google Generative AI after multiple retries.");
      }
    }
  }
  throw new Error("Failed to generate affirmation using Google Generative AI after multiple retries.");
}