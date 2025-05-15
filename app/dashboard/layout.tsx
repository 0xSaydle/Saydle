"use client";

import { Box } from "@chakra-ui/react";
import DashboardSidebar from "@/components/custom/DashboardSidebar";
import { usePathname } from "next/navigation";

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
    <Box minH="100vh" bg="#f2e3e1">
      {/* <DashboardHeader /> */}
      <Box
        as="main"
        ml={{ base: 0, md: "250px" }}
        pt="80px"
        px={{ base: 4, md: 8 }}
        maxW="1200px"
        mx="auto"
      >
        <DashboardSidebar />
        {children}
      </Box>
    </Box>
  );
}
