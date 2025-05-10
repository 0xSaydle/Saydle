"use client";
import { Box, Flex, Text, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "../../onboarding-context";

export default function OnboardingStep1() {
  const { onboardingData, setOnboardingData } = useOnboarding();
  const [name, setName] = useState(onboardingData.name || "");
  const router = useRouter();

  const handleContinue = () => {
    console.log("Name before update:", name);
    setOnboardingData((prev) => {
      const updated = { ...prev, name };
      console.log("Updated onboarding data:", updated);
      return updated;
    });
    router.push("/dashboard/onboarding/step/2");
  };

  return (
    <Flex
      flex={1}
      align="center"
      justify="center"
      direction={{ base: "column", md: "row" }}
    >
      {/* Sidebar */}
      <Box
        minW={{ base: "100%", md: "300px" }}
        borderRight={{ base: "none", md: "1px solid #eee" }}
        borderBottom={{ base: "1px solid #eee", md: "none" }}
        py={8}
        px={8}
        bg="transparent"
        display="flex"
        flexDirection="column"
        alignItems={{ base: "center", md: "flex-start" }}
        textAlign={{ base: "center", md: "left" }}
      >
        <Text color="#FF6F61" fontWeight="bold" fontSize="20px" mb={2}>
          About You
        </Text>
        <Text fontWeight="bold" mb={1}>
          Personal Information
        </Text>
        <Text color="gray.600">Please tell us more about you</Text>
      </Box>
      {/* Main Content */}
      <Flex
        flex={1}
        align="center"
        justify="center"
        w={{ base: "100%", md: "auto" }}
      >
        <Box w="100%" maxW="500px" mt={{ base: 4, md: 12 }} px={4}>
          <Text mb={2} fontWeight="medium">
            What would you like us to call you?
          </Text>
          <Input
            placeholder="Alex"
            value={name}
            border="1px solid #FfFfFf"
            onChange={(e) => setName(e.target.value)}
            mb={8}
          />
          <Button
            w="full"
            borderRadius="24px"
            bg="#FF6F61"
            color="white"
            _hover={{
              bg: "#A76D99",
              color: "white",
            }}
            fontWeight="bold"
            fontSize="16px"
            py={6}
            onClick={handleContinue}
          >
            Continue
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
}
