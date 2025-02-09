import { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID as string,
  process.env.TWILIO_AUTH_TOKEN as string
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { phoneNumber, otp } = req.body;

  if (!phoneNumber || !otp) return res.status(400).json({ error: "Phone number and OTP are required" });

  try {
    const response = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID as string)
      .verificationChecks.create({ to: phoneNumber, code: otp });

    if (response.status === "approved") {
      res.status(200).json({ success: true, message: "OTP Verified" });
    } else {
      res.status(400).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    res.status(500).json({ error: "OTP verification failed", details: error });
  }
}