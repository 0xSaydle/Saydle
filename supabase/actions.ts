"use server";
import { supabaseAdmin } from "@/middleware";
import { Session } from "next-auth";

type UserUpdateData = {
  name: string;
  phone_number: string;
  weaknesses: string;
  feelings: string;
  verified: boolean;
  updated_at: string;
};

export const updateUser = async (
  updateData: UserUpdateData,
  session: Session
) => {
  if (!session) {
    throw new Error("No session found");
  }

  const { data, error } = await supabaseAdmin
    .from("users")
    .update(updateData)
    .eq("email", session.user.email)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return { data: data };
};
