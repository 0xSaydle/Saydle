"use client";

import {
  Box,
  Flex,
  Text,
  Icon,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MdDashboard,
  MdPerson,
  MdSettings,
  MdSubscriptions,
  MdNotifications,
  MdHelp,
  MdMenu,
} from "react-icons/md";

const menuItems = [
  { name: "Dashboard", icon: MdDashboard, path: "/dashboard" },
  { name: "Profile", icon: MdPerson, path: "/dashboard/profile" },
  {
    name: "Subscriptions",
    icon: MdSubscriptions,
    path: "/dashboard/subscription",
  },
  {
    name: "Notifications",
    icon: MdNotifications,
    path: "/dashboard/notifications",
  },
  { name: "Settings", icon: MdSettings, path: "/dashboard/settings" },
  { name: "Help", icon: MdHelp, path: "/dashboard/help" },
];

const SidebarContent = ({ onClose }: { onClose?: () => void }) => {
  const pathname = usePathname();

  return (
    <Flex direction="column" gap={2} px={4}>
      {menuItems.map((item) => {
        const isActive = pathname === item.path;
        return (
          <Link
            key={item.path}
            href={item.path}
            style={{ textDecoration: "none" }}
            onClick={onClose}
          >
            <Flex
              align="center"
              gap={3}
              p={3}
              borderRadius="lg"
              bg={isActive ? "primary.20" : "transparent"}
              color={isActive ? "white" : "gray.600"}
              _hover={{
                bg: isActive ? "primary.20" : "gray.100",
              }}
            >
              <Icon as={item.icon} boxSize={5} />
              <Text fontWeight={isActive ? "bold" : "normal"}>{item.name}</Text>
            </Flex>
          </Link>
        );
      })}
    </Flex>
  );
};

export default function DashboardSidebar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {/* Mobile Menu Button */}
      <IconButton
        aria-label="Open menu"
        icon={<Icon as={MdMenu} />}
        display={{ base: "flex", md: "none" }}
        position="fixed"
        top="20px"
        left="20px"
        zIndex={1001}
        onClick={onOpen}
      />

      {/* Desktop Sidebar */}
      <Box
        w="250px"
        h="100vh"
        bg="white"
        borderRight="1px solid"
        borderColor="gray.200"
        position="fixed"
        left={0}
        top={0}
        pt="80px"
        display={{ base: "none", md: "block" }}
      >
        <SidebarContent />
      </Box>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody pt={4}>
            <SidebarContent onClose={onClose} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
