import { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID as string,
  process.env.TWILIO_AUTH_TOKEN as string
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { phoneNumber } = req.body;

  if (!phoneNumber) return res.status(400).json({ error: "Phone number is required" });

  try {
    const response = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID as string)
      .verifications.create({ to: phoneNumber, channel: "sms" });

    res.status(200).json({ success: true, sid: response.sid });
  } catch (error) {
    res.status(500).json({ error: "Failed to send OTP", details: error });
  }
}