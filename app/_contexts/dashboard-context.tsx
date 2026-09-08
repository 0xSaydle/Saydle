"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useSession } from "next-auth/react";
import { getSubDetails } from "@/supabase/actions";

interface SubDetails {
  renews_at?: string;
  status?: string;
  status_formatted?: string;
  product_name?: string;
  // Add other subscription details as needed
}

interface DashboardContextType {
  subDetails: SubDetails | null;
  isLoading: boolean;
}

const DashboardContext = createContext<DashboardContextType>({
  subDetails: null,
  isLoading: true,
});

export function DashboardProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [subDetails, setSubDetails] = useState<SubDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session?.user?.id) {
      getSubDetails(session.user.id)
        .then((data) => {
          setSubDetails(data);
        })
        .catch((error) => {
          console.error("Error fetching subscription details:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [session?.user?.id]);

  return (
    <DashboardContext.Provider value={{ subDetails, isLoading }}>
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => useContext(DashboardContext);
