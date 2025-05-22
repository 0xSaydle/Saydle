"use client";

import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdDashboard,
  MdSettings,
  MdLogout,
  MdSubscriptions,
} from "react-icons/md";
import { signOut } from "next-auth/react";

const menuItems = [
  { name: "Dashboard", icon: MdDashboard, path: "/dashboard" },
  {
    name: "Subscription",
    icon: MdSubscriptions,
    path: "/dashboard/subscription",
  },
  { name: "Settings", icon: MdSettings, path: "/dashboard/settings" },
];

const SidebarContent = ({ isMobile }: { isMobile: boolean }) => {
  const pathname = usePathname();
  return (
    <Flex
      direction={isMobile ? "row" : "column"}
      h={isMobile ? "auto" : "100%"}
      w={isMobile ? "100%" : "210px"}
      justify={isMobile ? "space-around" : "space-between"}
      align={"center"}
      py={isMobile ? 0 : 6}
      px={isMobile ? 0 : 0}
      bg={isMobile ? "white" : undefined}
    >
      <Flex
        direction={isMobile ? "row" : "column"}
        w={isMobile ? "100%" : "auto"}
        justifyContent="space-between"
        px={{ base: "10px" }}
      >
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link key={item.path} href={item.path}>
              <Flex
                direction={isMobile ? "column" : "row"}
                alignItems="center"
                gap={isMobile ? 0 : 2}
                justify={isMobile ? "center" : "flex-start"}
                px={isMobile ? 2 : 6}
                py={isMobile ? 2 : 3}
                fontWeight={isActive ? "bold" : "normal"}
                color={isActive ? "#FF6F61" : "gray.700"}
                bg={isActive && !isMobile ? "#FFF3F0" : "transparent"}
                borderRadius={isMobile ? "none" : "md"}
                _hover={{ bg: isMobile ? "gray.100" : "gray.100" }}
                mb={isMobile ? 0 : 1}
                fontSize={isMobile ? "xs" : "15px"}
              >
                <Icon as={item.icon} boxSize={5} mb={isMobile ? 0 : 1} />
                {!isMobile && <Text fontSize="15px">{item.name}</Text>}
                {isMobile && (
                  <Text fontSize="10px" mt={1}>
                    {item.name}
                  </Text>
                )}
              </Flex>
            </Link>
          );
        })}
        <Flex
          flexDir={"column"}
          hideBelow={"md"}
          flex={1}
          justifyContent="center"
        ></Flex>
        {/* Logout button */}
        <Flex
          direction={isMobile ? "column" : "row"}
          alignItems="center"
          justifyContent={isMobile ? "center" : "flex-start"}
          gap={isMobile ? 0 : 2}
          px={isMobile ? 2 : 6}
          py={isMobile ? 2 : 3}
          color="gray.700"
          fontWeight="normal"
          borderRadius={isMobile ? "none" : "md"}
          cursor="pointer"
          _hover={{ bg: isMobile ? "gray.100" : "gray.100" }}
          mb={isMobile ? 0 : 1}
          fontSize={isMobile ? "xs" : "15px"}
          onClick={() => signOut()}
        >
          <Icon as={MdLogout} boxSize={5} mb={isMobile ? 0 : 1} />
          {!isMobile && <Text fontSize="15px">Logout</Text>}
          {isMobile && (
            <Text fontSize="10px" mt={1}>
              Logout
            </Text>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default function DashboardSidebar() {
  return (
    <>
      {/* Desktop Sidebar */}
      <Box
        w="210px"
        h="100vh"
        bg="white"
        borderRight="1px solid #F0F0F0"
        position="fixed"
        left={0}
        top={0}
        pt="60px"
        display={{ base: "none", md: "block" }}
        zIndex={1100}
      >
        <SidebarContent isMobile={false} />
      </Box>
      {/* Mobile Bottom Bar */}
      <Box
        w="100vw"
        h="60px"
        bg="white"
        borderTop="1px solid #F0F0F0"
        position="fixed"
        left={0}
        bottom={0}
        display={{ base: "flex", md: "none" }}
        zIndex={1100}
        boxShadow="0 -2px 8px rgba(0,0,0,0.03)"
        alignItems="center"
        justifyContent="space-between"
      >
        <SidebarContent isMobile={true} />
      </Box>
    </>
  );
}
