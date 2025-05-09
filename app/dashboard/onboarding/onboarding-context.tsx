import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

export interface OnboardingData {
  name: string;
  country: string;
  phone: string;
  code: string;
  struggles: string;
  feelings: string;
  plan: string;
  // Add more fields for other steps as needed
}

interface OnboardingContextType {
  onboardingData: OnboardingData;
  setOnboardingData: Dispatch<SetStateAction<OnboardingData>>;
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
    struggles: "",
    feelings: "",
    plan: "basic",
  });
  return (
    <OnboardingContext.Provider value={{ onboardingData, setOnboardingData }}>
      {children}
    </OnboardingContext.Provider>
  );
}
