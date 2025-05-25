"use client";

import { Box } from "@chakra-ui/react";

export default function SettingLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box minH="100vh" bg="#f2e3e1">
      {/* <DashboardHeader /> */}
      <Box
        as="main"
        // ml={{ base: 0, md: "250px" }}
        // pt="0px"
        px={{ base: 4, md: 4 }}
        // maxW="1200px"
        mx="auto"
      >
        {children}
      </Box>
    </Box>
  );
}