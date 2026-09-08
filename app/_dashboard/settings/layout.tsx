"use client";

import { Box, ChakraProvider } from "@chakra-ui/react";
import theme from "@/theme";

export default function SettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChakraProvider value={theme}>
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
    </ChakraProvider>
  );
}
