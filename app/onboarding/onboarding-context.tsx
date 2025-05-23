import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { updateUser } from "@/supabase/actions";
import { useSession } from "next-auth/react";
import { z } from "zod";

export const nameSchema = z
  .string()
  .min(2, { message: "Name must be at least 2 characters long." })
  .max(50, { message: "Name must be less than 50 characters." })
  .regex(/^[a-zA-Z\s]*$/, {
    message: "Name can only contain letters and spaces.",
  });

export const phoneSchema = z
  .string()
  .min(10, { message: "Phone number must be at least 10 characters long." })
  .regex(/^\+?[0-9]\d{1,14}$/, {
    message: "Please enter a valid phone number.",
  });

export interface OnboardingData {
  name: string;
  country: string;
  phone: string;
  weaknesses: string;
  feelings: string;
  plan: string;
}

interface OnboardingContextType {
  onboardingData: OnboardingData;
  setOnboardingData: Dispatch<SetStateAction<OnboardingData>>;
  completeOnboarding: () => Promise<void>;
  validateStep: (step: number) => boolean;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    name: "",
    country: "US",
    phone: "",
    weaknesses: "",
    feelings: "",
    plan: "basic",
  });

  const { data: session } = useSession();

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return nameSchema.safeParse(onboardingData.name).success;
      case 2:
        return (
          nameSchema.safeParse(onboardingData.name).success &&
          phoneSchema.safeParse(onboardingData.phone).success
        );
      case 3:
        return (
          nameSchema.safeParse(onboardingData.name).success &&
          phoneSchema.safeParse(onboardingData.phone).success &&
          onboardingData.weaknesses.trim().length > 0
        );
      case 4:
        return (
          nameSchema.safeParse(onboardingData.name).success &&
          phoneSchema.safeParse(onboardingData.phone).success &&
          onboardingData.weaknesses.trim().length > 0 &&
          onboardingData.feelings.trim().length > 0
        );
      case 5:
        return (
          nameSchema.safeParse(onboardingData.name).success &&
          phoneSchema.safeParse(onboardingData.phone).success &&
          onboardingData.weaknesses.trim().length > 0 &&
          onboardingData.feelings.trim().length > 0 &&
          onboardingData.plan !== ""
        );
      default:
        return false;
    }
  };

  const completeOnboarding = async () => {
    if (!session?.user?.email) {
      throw new Error("No user email found in session");
    }
    console.log(session.user.email);

    try {
      const updateData = {
        name: onboardingData.name,
        phone_number: onboardingData.phone,
        weaknesses: onboardingData.weaknesses,
        feelings: onboardingData.feelings,
        verified: true,
        updated_at: new Date().toISOString(),
      };

      const { data, error } = await updateUser(updateData, session);
      console.log("data", data);
      console.log("error", error);
      if (error) {
        console.error("Error updating user data:", error);
        throw error;
      }
    } catch (error) {
      console.error("Failed to update user data:", error);
      throw error;
    }
  };

  return (
    <OnboardingContext.Provider
      value={{
        onboardingData,
        setOnboardingData,
        completeOnboarding,
        validateStep,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}
