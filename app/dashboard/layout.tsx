"use client";

import { Box } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/custom/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isOnboarding = pathname?.includes("/onboarding");

  if (isOnboarding) {
    return <>{children}</>;
  }

  return (
    <Box h="100vh" bg="#f2e3e1">
      <Navbar />
      <Box as="main" pt="80px">
        {children}
      </Box>
    </Box>
  );
}
