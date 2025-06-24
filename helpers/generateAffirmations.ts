const HF_API_KEY = process.env.HF_API_KEY

interface HFResponse {
  generated_text: string;
}

export async function generateAffirmation(prompt: string): Promise<string> {
    const res = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HF_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: prompt }),
  });

  // console.log("Ai res", res)

  const contentType = res.headers.get("content-type");

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Hugging Face API error response:", errorText);
    throw new Error("Failed to fetch from Hugging Face API");
  }

  if (!contentType?.includes("application/json")) {
    // const rawText = await res.text();
    // console.error("Unexpected non-JSON response:", rawText);
    throw new Error("Unexpected non-JSON response from Hugging Face API");
  }

  const data = (await res.json()) as HFResponse[];

  const generatedText = data?.[0]?.generated_text || "";
  // console.log(generatedText)
  const instructionLine = "Only respond with the affirmation text. Do NOT include the prompt or any additional explanation.";
  const splitText = generatedText.split(instructionLine);

  // Get the part after the instruction line
  let affirmation = splitText[1]?.trim() || "You're doing amazing!";
  // Step 2: Remove surrounding quotes if present
  if (affirmation.startsWith('"') && affirmation.endsWith('"')) {
    affirmation = affirmation.slice(1, -1).trim();
  }
  // console.log("formattedText", affirmation)
  return  affirmation;
}


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
    locale?: string;      // e.g. "en-US", "en-NG", "fr-FR"
}

// const encouragements = [
//     "You're doing amazing!",
//     "Keep pushing forward!",
//     "You’ve got this!",
//     "Believe in your journey!",
//     "Stay strong and proud!",
//     "One step at a time, you're getting closer.",
//     "Your effort is paying off.",
//     "Trust the process.",
//     "You are stronger than you think.",
//     "Progress, not perfection.",
//     "Every day is a fresh start.",
//     "Keep showing up. It matters.",
//     "You make a difference.",
//     "Your potential is limitless.",
//     "Small steps lead to big change.",
//     "You've overcome so much already.",
//     "Keep going—you’re on the right path.",
//     "You are capable of amazing things.",
//     "The best is yet to come.",
//     "Your dedication inspires others.",
//     "You're growing every day.",
//     "Don't forget how far you’ve come.",
//     "You are enough, just as you are.",
//     "Breathe. You’re doing your best.",
//     "You are not alone in this.",
//     "Be proud of your progress.",
//     "Your dreams are valid.",
//     "Light shines through you.",
//     "Even slow progress is progress.",
//     "Stay kind to yourself."
//   ];
  

export async function buildAffirmationPrompt(input: AffirmationInput): Promise<string> {
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
  } = input;

  const lines: string[] = [];
  if (name) {
    lines.push(`This affirmation is for ${name}:`);
  }

  lines.push("Act as a professional and culturally aware coach.");
  lines.push(`Respond in a tone appropriate for locale: ${locale}.`);
  lines.push("Craft a short and empowering affirmation (1–2 sentences) for someone based on the following:");

  if (personalityType) lines.push(`- Personality type: ${personalityType}`);
  if (strengths.length) lines.push(`- Strengths: ${strengths.join(", ")}`);
  if (weaknesses.length) lines.push(`- Weaknesses: ${weaknesses.join(", ")}`);
  if (jobTitle) lines.push(`- Job Title: ${jobTitle}`);
  if (company) lines.push(`- Company: ${company}`);
  if (experienceYears) lines.push(`- Experience: ${experienceYears} years`);
  if (currentGoal) lines.push(`- Current Goal: ${currentGoal}`);
  if (currentMood) lines.push(`- Current Mood: ${currentMood}`);

  const allMessages = Object.values(encouragements).flat();
  const randomEncouragement = allMessages[Math.floor(Math.random() * allMessages.length)];


  lines.push("Make the affirmation supportive, culturally sensitive, and personally relevant.");
  lines.push("Avoid generic clichés. Focus on encouragement that aligns with their profile.");
  lines.push(`End the affirmation with something like: "${randomEncouragement}"`);
  lines.push("Only respond with the affirmation text. Do NOT include the prompt or any additional explanation.");
  
  return lines.join("\n");
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

function getRandomEncouragementByMood(mood: string): string {
  const categories = moodToCategory[mood];
  if (!categories || categories.length === 0) return "💭 Stay kind to yourself.";

  const messages = categories.flatMap(category => encouragements[category]);
  const randomIndex = Math.floor(Math.random() * messages.length);
  return messages[randomIndex];
}

