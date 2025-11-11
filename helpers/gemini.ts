import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY!);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
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
}

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
  } = input;

  const lines: string[] = [];
  if (name) {
    // If a name is provided, we can slightly adapt the intro,
    // but the core affirmation will still be "I am..."
    lines.push(`Hello ${name}! Here's an affirmation for you:`);
  } else {
    lines.push(`Here's an affirmation for you:`);
  }

  lines.push(`Act as a professional and culturally aware coach with a ${tone} tone.`);
  lines.push(`Respond in a tone appropriate for locale: ${locale}.`);
  // Crucial change: Instruct the model to use the "I am..." pattern.
  lines.push("Craft a short and empowering affirmation (1–2 sentences) that starts with 'I am...' and focuses on personal strengths and potential, based on the following:");

  if (personalityType) lines.push(`- Personality type: ${personalityType}`);
  if (strengths.length) lines.push(`- Strengths: ${strengths.join(", ")}`);
  if (weaknesses.length) lines.push(`- Weaknesses: ${weaknesses.join(", ")}`);
  if (jobTitle) lines.push(`- Job Title: ${jobTitle}`);
  if (company) lines.push(`- Company: ${company}`);
  if (experienceYears) lines.push(`- Experience: ${experienceYears} years`);
  if (currentGoal) lines.push(`- Current Goal: ${currentGoal}`);
  if (currentMood) lines.push(`- Current Mood: ${currentMood}`);

  const tailoredEncouragement = getRandomEncouragementByMood(currentMood);


  lines.push("Make the affirmation supportive, culturally sensitive, and personally relevant.");
  lines.push("Avoid generic clichés. Focus on encouragement that aligns with their profile.");
  lines.push("Use simple, direct, and easy-to-understand words.");
  // We'll slightly adjust the ending instruction because the main affirmation is "I am..."
  // The encouragement can still follow as a second sentence or a concluding thought.
  lines.push(`Conclude with a supportive thought like: "${tailoredEncouragement}"`);
  lines.push("Only respond with the affirmation text. Do NOT include the prompt or any additional explanation.");

  return lines.join("\n");
}

// Helper function for delay
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function generateAffirmation(prompt: string, retries = 3, initialDelay = 1000): Promise<string> {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return text || "I am doing great today!"; // Adjusted fallback to match "I am..."
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