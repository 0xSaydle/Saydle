import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { supabaseAdmin } from "@/supabase/supabase_client";
import { useSession } from "next-auth/react";

export interface OnboardingData {
  name: string;
  country: string;
  phone: string;
  code: string;
  weaknesses: string;
  feelings: string;
  plan: string;
  // Add more fields for other steps as needed
}

interface OnboardingContextType {
  onboardingData: OnboardingData;
  setOnboardingData: Dispatch<SetStateAction<OnboardingData>>;
  completeOnboarding: () => Promise<void>;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(
  undefined
);

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx)
    throw new Error("useOnboarding must be used within OnboardingProvider");
  return ctx;
}

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    name: "",
    country: "US",
    phone: "",
    code: "",
    weaknesses: "",
    feelings: "",
    plan: "basic",
  });

  const { data: session } = useSession();

  const completeOnboarding = async () => {
    if (!session?.user?.email) {
      throw new Error("No user email found in session");
    }

    console.log("Session user:", session.user);
    console.log("Onboarding data:", onboardingData);
    console.log("Name being saved:", onboardingData.name);

    try {
      const updateData = {
        name: onboardingData.name,
        phone_number: onboardingData.phone,
        weaknesses: [onboardingData.weaknesses], // Store as text array
        feelings: [onboardingData.feelings], // Store as text array
        verified: true,
        updated_at: new Date().toISOString(),
      };

      console.log("Update data being sent:", updateData);

      const { error } = await supabaseAdmin
        .from("users")
        .update(updateData)
        .eq("email", session.user.email);

      if (error) {
        console.error("Error updating user data:", error);
        throw error;
      }

      console.log("Successfully updated user data with onboarding information");
    } catch (error) {
      console.error("Failed to update user data:", error);
      throw error;
    }
  };

  return (
    <OnboardingContext.Provider
      value={{ onboardingData, setOnboardingData, completeOnboarding }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}
