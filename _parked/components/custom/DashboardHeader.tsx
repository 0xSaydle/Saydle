"use client";

import { Box, Flex, Text, Icon, Button } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { useSession, signOut } from "next-auth/react";
import { MdNotifications, MdSettings, MdLogout } from "react-icons/md";
import { Logo } from "./logo";
import { useState } from "react";

export default function DashboardHeader() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      h="80px"
      bg="white"
      borderBottom="1px solid"
      borderColor="gray.200"
      zIndex={1000}
    >
      <Flex h="100%" px={8} align="center" justify="space-between">
        {/* Logo */}
        <Box>
          <Logo />
        </Box>

        {/* Right side - User profile and notifications */}
        <Flex align="center" gap={4}>
          {/* Notifications */}
          <Icon
            as={MdNotifications}
            boxSize={6}
            color="gray.600"
            cursor="pointer"
            _hover={{ color: "primary.20" }}
          />

          {/* User Menu */}
          <Box position="relative">
            <Button variant="ghost" p={0} onClick={() => setIsOpen(!isOpen)}>
              <Flex align="center" gap={2}>
                <Avatar
                  size="sm"
                  name={session?.user?.name || "User"}
                  src={session?.user?.image || undefined}
                />
                <Text fontWeight="medium" color="gray.700">
                  {session?.user?.name || "User"}
                </Text>
              </Flex>
            </Button>

            {isOpen && (
              <Flex
                direction="column"
                position="absolute"
                right={0}
                top="100%"
                mt={2}
                bg="white"
                boxShadow="md"
                borderRadius="md"
                minW="200px"
                border="1px solid"
                borderColor="gray.200"
              >
                <Button
                  variant="ghost"
                  justifyContent="flex-start"
                  w="100%"
                  borderRadius={0}
                  onClick={() => {
                    setIsOpen(false);
                    // Add settings navigation here
                  }}
                >
                  <Icon as={MdSettings} mr={2} />
                  Settings
                </Button>
                <Button
                  variant="ghost"
                  justifyContent="flex-start"
                  w="100%"
                  borderRadius={0}
                  onClick={() => {
                    setIsOpen(false);
                    signOut();
                  }}
                >
                  <Icon as={MdLogout} mr={2} />
                  Logout
                </Button>
              </Flex>
            )}
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
