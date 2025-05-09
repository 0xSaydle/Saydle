"use client";
import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Icon,
  Button,
  Input,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import {
  FiHome,
  FiCalendar,
  FiSettings,
  FiLogOut,
  FiMenu,
} from "react-icons/fi";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { useSession, signOut } from "next-auth/react";

export default function Dashboard() {
  const router = useRouter();
  const { data: session } = useSession();
  const { open, onOpen, onClose } = useDisclosure();
  const navItems = [
    { icon: FiHome, label: "Dashboard", path: "/dashboard" },
    {
      icon: FiCalendar,
      label: "Subscription",
      path: "/dashboard/subscription",
    },
    { icon: FiSettings, label: "Settings", path: "/dashboard/settings" },
  ];

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/login" });
  };

  const handleSupport = () => {
    // You can replace this with your preferred support system
    window.open("mailto:support@saydle.com", "_blank");
  };

  const SidebarContent = () => (
    <Box>
      {/* Logo */}
      <Box mb={8} px={4}>
        <Text fontSize="24px" fontWeight="bold" color="#FF6F61">
          Saydle
        </Text>
      </Box>
      {/* Navigation */}
      <VStack gap={2} align="stretch">
        {navItems.map((item) => (
          <Button
            key={item.label}
            variant="ghost"
            justifyContent="flex-start"
            onClick={() => {
              router.push(item.path);
              onClose();
            }}
            _hover={{ bg: "gray.100" }}
            h="48px"
            fontWeight="medium"
            fontSize="16px"
            aria-label={`Navigate to ${item.label}`}
            leftIcon={<Icon as={item.icon} />}
          >
            {item.label}
          </Button>
        ))}
      </VStack>
      {/* Logout Button */}
      <Button
        variant="ghost"
        justifyContent="flex-start"
        mt="auto"
        color="red.500"
        _hover={{ bg: "red.50" }}
        h="48px"
        fontWeight="medium"
        fontSize="16px"
        onClick={handleLogout}
        aria-label="Logout from account"
        leftIcon={<Icon as={FiLogOut} />}
      >
        Logout
      </Button>
    </Box>
  );

  return (
    <Flex
      h="100vh"
      bgGradient="radial(circle at 70% 60%, #fff 60%, #ffe7e5 100%)"
    >
      {/* Mobile Menu Button */}
      <IconButton
        aria-label="Open menu"
        display={{ base: "flex", md: "none" }}
        position="fixed"
        top={4}
        left={4}
        zIndex={1000}
        onClick={onOpen}
      >
        <Icon as={FiMenu} />
      </IconButton>

      {/* Mobile Menu */}
      <Box
        as="nav"
        position="fixed"
        top={0}
        left={0}
        bottom={0}
        w="240px"
        bg="white"
        transform={open ? "translateX(0)" : "translateX(-100%)"}
        transition="transform 0.2s"
        zIndex={999}
        display={{ base: "block", md: "none" }}
        boxShadow="lg"
      >
        <Box p={4}>
          <SidebarContent />
        </Box>
      </Box>

      {/* Overlay */}
      {open && (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="blackAlpha.600"
          zIndex={998}
          onClick={onClose}
          display={{ base: "block", md: "none" }}
        />
      )}

      {/* Desktop Sidebar */}
      <Box
        w="240px"
        bg="#fff"
        borderRight="1px"
        borderColor="#F0F0F0"
        py={6}
        px={4}
        display={{ base: "none", md: "block" }}
      >
        <SidebarContent />
      </Box>

      {/* Main Content */}
      <Flex flex={1} direction="column">
        {/* Header */}
        <Box
          h="64px"
          bg="#fff"
          borderBottom="1px"
          borderColor="#F0F0F0"
          px={8}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <HStack gap={4} flex={1}>
            <Box w="320px" maxW="100%">
              <Input
                placeholder="Type to search"
                bg="#F5F7F9"
                borderRadius="full"
                border="1px solid #E2E8F0"
                fontSize="15px"
                px={6}
                py={2}
                _focus={{
                  borderColor: "#FF6F61",
                  boxShadow: "0 0 0 1px #FF6F61",
                }}
                aria-label="Search"
              />
            </Box>
          </HStack>
          <Avatar
            size="sm"
            name={session?.user?.name || "User"}
            src={session?.user?.image || "/default-avatar.png"}
            aria-label="User profile"
          />
        </Box>
        {/* Content Area */}
        <Box flex={1} p={{ base: 2, md: 8 }}>
          <Text fontWeight="bold" fontSize="md" mb={2} mt={2}>
            Hey {session?.user?.name || "there"}{" "}
            <Box as="span" color="gray.500">
              – here&apos;s what&apos;s happening with your account today
            </Box>
          </Text>
          {/* Affirmation Card */}
          <Box
            bg="#fff"
            borderRadius="lg"
            p={{ base: 4, md: 8 }}
            boxShadow="sm"
            border="1px solid #F0F0F0"
            mb={8}
            maxW="700px"
          >
            <Text fontSize="18px" fontWeight="bold" textAlign="center">
              Remember, every small step you take is progress. You are doing
              wonderfully
            </Text>
            <Text fontSize="sm" color="gray.500" textAlign="right" mt={2}>
              Saydle affirmations
            </Text>
          </Box>
          {/* Status Cards */}
          <HStack gap={6} mb={8} flexWrap="wrap">
            <Box
              bg="#fff"
              borderRadius="lg"
              p={6}
              boxShadow="sm"
              border="1px solid #F0F0F0"
              minW="220px"
              flex={1}
              maxW="300px"
            >
              <Text fontSize="xs" color="gray.500" mb={1} fontWeight="semibold">
                SUBSCRIPTION STATUS
              </Text>
              <HStack gap={2} align="center">
                <Box w={2} h={2} borderRadius="full" bg="green.400" />
                <Text fontWeight="bold" color="green.500">
                  Active
                </Text>
              </HStack>
            </Box>
            <Box
              bg="#fff"
              borderRadius="lg"
              p={6}
              boxShadow="sm"
              border="1px solid #F0F0F0"
              minW="220px"
              flex={1}
              maxW="300px"
            >
              <Text fontSize="xs" color="gray.500" mb={1} fontWeight="semibold">
                NEXT BILLING DATE
              </Text>
              <Text fontWeight="bold" fontSize="lg">
                1st February 2025
              </Text>
            </Box>
          </HStack>
          <Box mt={8} maxW="300px">
            <Box
              bg="#fff"
              borderRadius="lg"
              p={6}
              boxShadow="sm"
              border="1px solid #F0F0F0"
              textAlign="center"
            >
              <Box mb={4}>
                <Icon as={FiHome} boxSize={8} color="#FF6F61" />
              </Box>
              <Text fontWeight="bold" mb={2}>
                CUSTOMER SUPPORT
              </Text>
              <Button
                colorScheme="red"
                borderRadius="full"
                px={8}
                py={2}
                fontWeight="bold"
                bg="#FF6F61"
                _hover={{ bg: "#A76D99" }}
                onClick={handleSupport}
                aria-label="Contact customer support"
              >
                Contact
              </Button>
            </Box>
          </Box>
          <Text fontSize="xs" color="gray.500" mt={8}>
            *To manage or cancel your subscription, simply navigate to the
            subscription option in the dashboard menu.
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}
