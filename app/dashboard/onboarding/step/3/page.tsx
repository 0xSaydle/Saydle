"use client";
import { Box, Flex, Text, Input, Button, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "../../onboarding-context";

export default function OnboardingStep3() {
  const { onboardingData, setOnboardingData } = useOnboarding();
  const [weaknesses, setWeaknesses] = useState(onboardingData.weaknesses || "");
  const router = useRouter();

  const handleContinue = () => {
    setOnboardingData((prev) => ({ ...prev, weaknesses }));
    router.push("/dashboard/onboarding/step/4");
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
          Personalized affirmations
        </Text>
        <Text fontWeight="bold" mb={1}>
          Daily reminders
        </Text>
        <Text color="gray.600" mb={6}>
          Lets improve your mental health
        </Text>
        {/* Illustration placeholder */}
        <Box mt={4} mb={2} alignSelf={{ base: "center", md: "flex-start" }}>
          <Box
            width="70px"
            height="90px"
            borderRadius="30px"
            bg="#A76D99"
            display="flex"
            alignItems="center"
            justifyContent="center"
            mb={2}
          >
            <Text fontSize="40px" color="white" fontWeight="bold">
              😌
            </Text>
          </Box>
          <Text color="#A76D99" fontWeight="bold" textAlign="center">
            Breathe in
          </Text>
        </Box>
      </Box>
      {/* Main Content */}
      <Flex
        flex={1}
        align="center"
        justify="center"
        w={{ base: "100%", md: "auto" }}
      >
        <Box w="100%" maxW="600px" mt={{ base: 4, md: 12 }} px={4}>
          <Text mb={1} fontWeight="medium">
            What's something you've been struggling with?
          </Text>
          <Text mb={4} color="gray.500" fontSize="sm">
            (The more you share the more personalized your affirmations will be)
          </Text>
          <Textarea
            placeholder="Tell us your thoughts..."
            value={weaknesses}
            onChange={(e) => setWeaknesses(e.target.value)}
            mb={8}
            minH="120px"
            bg="white"
            border="1px solid #FfFfFf"
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
