"use client";

import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { GeneralSans } from "./fonts";

import React from "react";

const NotFound: React.FC = () => {
  const router = useRouter();

  return (
    <Box
      minH="100vh"
      bg="#F5F7F9"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      className={GeneralSans.className}
    >
      {/* Logo */}
      <Box mb={8}>
        <Text fontSize="32px" fontWeight="bold" color="#FF6F61">
          Saydle
        </Text>
      </Box>

      {/* Main Content */}
      <Flex
        direction="column"
        align="center"
        textAlign="center"
        maxW="600px"
        px={4}
      >
        <Text
          fontSize="120px"
          fontWeight="bold"
          color="#FF6F61"
          lineHeight="1"
          mb={4}
        >
          404
        </Text>
        <Text fontSize="32px" fontWeight="bold" color="dark.500" mb={4}>
          Oops! Page Not Found
        </Text>
        <Text fontSize="18px" color="gray.500" mb={8} maxW="400px">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get
          you back on track.
        </Text>

        {/* Action Buttons */}
        <Flex gap={4}>
          <Button
            bg="#FF6F61"
            color="white"
            _hover={{ bg: "#A76D99" }}
            size="lg"
            onClick={() => router.push("/dashboard")}
          >
            Go to Dashboard
          </Button>
          <Button
            variant="outline"
            borderColor="#FF6F61"
            color="#FF6F61"
            _hover={{ bg: "#FF6F6110" }}
            size="lg"
            onClick={() => router.back()}
          >
            Go Back
          </Button>
        </Flex>
      </Flex>

      {/* Decorative Elements */}
      <Box position="absolute" bottom={8} left={0} right={0} textAlign="center">
        <Text fontSize="sm" color="gray.400">
          Remember, every small step you take is progress. You are doing
          wonderfully.
        </Text>
      </Box>
    </Box>
  );
};

export default NotFound;
