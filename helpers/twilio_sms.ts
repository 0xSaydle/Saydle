import twilio  from "twilio"

// ENV Vars
const twilioSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuth = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
const TWILIO_WHATSAPP_PREFIX = "whatsapp:";

if (!twilioSid || !twilioAuth || !twilioNumber) {
  throw new Error("Missing Twilio credentials or phone number in env");
}
const twilioClient = new twilio.Twilio(twilioSid, twilioAuth);

export async function sendViaTwilio(to_phone: string, body: string, channel: string) {
  const from = channel === "whatsapp" ? TWILIO_WHATSAPP_PREFIX + twilioNumber : twilioNumber;
  const toFormatted = channel === "whatsapp" ? TWILIO_WHATSAPP_PREFIX + to_phone : to_phone;
console.log(to_phone)
  try {
    const response = await twilioClient.messages.create({
      from: from,
      to: toFormatted,
      body: body,
    });
    console.log("✅ SMS sent successfully:", response.sid);
    return response;
  } catch (err: any) {
    console.error("❌ Twilio Error Message:", err?.message);
    console.error("❌ Twilio Error Details:", err);
    throw new Error("Twilio failed to send SMS");
  }
}
  