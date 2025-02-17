import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../lib/mongo";
import User from "../../../lib/User";
import { z } from "zod";

const updateSchema = z.object({
  email: z.string().email("Invalid email"),
  profilePicture: z.string().url("Invalid image URL"),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === "PUT") {
    try {
      const validatedData = updateSchema.parse(req.body);

      // Find user by email and update profile picture
      const updatedUser = await User.findOneAndUpdate(
        { email: validatedData.email },
        { profilePicture: validatedData.profilePicture },
        { new: true }
      );

      if (!updatedUser) return res.status(404).json({ message: "User not found" });

      return res.status(200).json({ message: "Profile updated", user: updatedUser });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Validation failed", errors: error.errors });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
