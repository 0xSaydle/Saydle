import mongoose, { Schema, Document } from "mongoose";

// Define the OTP document structure
interface OtpDocument extends Document {
  phoneNumber: string;
  otp: string;
  expiresAt: Date;
}

// Define the schema
const OtpSchema = new Schema<OtpDocument>({
  phoneNumber: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true, expires: 300 }, // Auto-delete after 5 mins
});

// Export the model
export default mongoose.models.Otp || mongoose.model<OtpDocument>("Otp", OtpSchema);
