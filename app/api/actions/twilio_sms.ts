import twilio  from "twilio"

// ENV Vars
const twilioSid = process.env.TWILIO_ACCOUNT_SID;
const twilioAuth = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_PHONE_NUMBER;
const TWILIO_WHATSAPP_PREFIX = "whatsapp:";4

if (!twilioSid || !twilioAuth) {
  throw new Error("Missing Twilio credentials in env");
}
const twilioClient = new twilio.Twilio(twilioSid, twilioAuth);

export async function sendViaTwilio(to_phone: string, body: string, channel: string) {
  const from = channel === "whatsapp" ? TWILIO_WHATSAPP_PREFIX + twilioNumber : twilioNumber;
  const toFormatted = channel === "whatsapp" ? TWILIO_WHATSAPP_PREFIX + to_phone : to_phone;

  try {
    const message = await twilioClient.messages.create({
      from: from,
      to: toFormatted,
      body: body,
    });
    return new Response(JSON.stringify({ message: 'SMS sent successfully!', data: message } ), {
      status: 200,
    });
  } catch (error) {
    // console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to send SMS' }), {
      status: 500,
    });
  }
}
  