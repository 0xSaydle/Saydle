// import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
// import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
// import { Twilio } from "https://esm.sh/twilio@4.15.0";

// const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
// const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// const TWILIO_ACCOUNT_SID = Deno.env.get("TWILIO_ACCOUNT_SID")!;
// const TWILIO_AUTH_TOKEN = Deno.env.get("TWILIO_AUTH_TOKEN")!;
// const TWILIO_SMS_FROM = Deno.env.get("TWILIO_SMS_FROM")!;
// const TWILIO_WHATSAPP_FROM = Deno.env.get("TWILIO_WHATSAPP_FROM")!;

// const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
// const twilioClient = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// serve(async () => {
//   try {
//     const now = new Date();
//     const nowTime = now.toTimeString().slice(0, 5);
//     const dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
//     const currentDay = dayNames[now.getDay()];

//     // Fetch users with preferences matching current time/day
//     const { data: users, error } = await supabase
//       .from("user_preferences")
//       .select("user_id, phone_number, delivery_method, frequency, time_of_day, days_of_week")
//       .eq("is_opted_in", true)
//       .filter("time_of_day", "eq", nowTime)
//       .or(`frequency.eq.daily,frequency.eq.weekly`)
//       .or(`days_of_week.cs.{${currentDay}}`);

//     if (error) throw error;
//     if (!users || users.length === 0) {
//       console.log("No users to send affirmations right now.");
//       return new Response(JSON.stringify({ sentTo: 0 }), {
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     // Example affirmation message (customize as you want)
//     const affirmationMessage = "🌟 Here's your daily affirmation: You are capable of amazing things! Keep shining! 🌟";

//     // Send SMS or WhatsApp based on user preference
//     for (const user of users) {
//       if (!user.phone_number) continue;

//       try {
//         if (user.delivery_method === "sms") {
//           await twilioClient.messages.create({
//             body: affirmationMessage,
//             from: TWILIO_SMS_FROM,
//             to: user.phone_number,
//           });
//         } else if (user.delivery_method === "whatsapp") {
//           await twilioClient.messages.create({
//             body: affirmationMessage,
//             from: TWILIO_WHATSAPP_FROM,          // e.g. 'whatsapp:+1234567890'
//             to: `whatsapp:${user.phone_number}`, // e.g. 'whatsapp:+19876543210'
//           });
//         }
//         console.log(`Sent affirmation to ${user.phone_number} via ${user.delivery_method}`);
//       } catch (sendError) {
//         console.error(`Failed to send to ${user.phone_number}:`, sendError);
//       }
//     }

//     return new Response(JSON.stringify({ sentTo: users.length }), {
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (e) {
//     console.error("Error in sendAffirmations:", e);
//     return new Response(JSON.stringify({ error: e.message }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// });
