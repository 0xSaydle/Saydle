"use client";

import { Box, Flex, ChakraProvider } from "@chakra-ui/react";
import DashboardSidebar from "@/components/custom/DashboardSidebar";
import { DashboardProvider } from "../contexts/dashboard-context";
import { Avatar } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { Logo } from "@/components/custom/logo";
import theme from "@/theme";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/affirmation");
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to generate affirmations");   
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }
    fetchProfile();
  }, []);
  

  return (
    <ChakraProvider value={theme}>
      <DashboardProvider>
        <Box minH="100vh" bg="#f2e3e1">
          {/* Mobile Logo */}
          <Box
            display={{ base: "block", md: "none" }}
            position="fixed"
            top={0}
            left={0}
            right={0}
            bg="white"
            p={4}
            zIndex={1200}
            borderBottom="1px solid #F0F0F0"
          >
            <Flex justify="space-between" align="center">
              <Logo />
              <Avatar
                name={session?.user?.name || ""}
                src={session?.user?.image || undefined}
                size="sm"
              />
            </Flex>
          </Box>
          <Box
            as="main"
            ml={{ base: 0, md: "250px" }}
            pt={{ base: "100px", md: "80px" }}
            pb="200px"
            px={{ base: 4, md: 8 }}
            maxW="1200px"
            mx="auto"
          >
            <DashboardSidebar />
            {children}
          </Box>
        </Box>
      </DashboardProvider>
    </ChakraProvider>
  );
}
