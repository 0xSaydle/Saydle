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

export const getSubDetails = async (id: string | undefined) => {
  try {
    console.log(id);
    const { data, error } = await supabaseAdmin
      .from("subscriptions")
      .select("*")
      .eq("user_id", id)
      .single();
    const subData = await data;

    console.log(subData);
    if (error) {
      throw new Error("Error getting subscription details", error);
    }

    return subData;
  } catch (error) {
    console.log(error);
  }
};
