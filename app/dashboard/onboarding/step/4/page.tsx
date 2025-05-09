"use client";
import { Box, Flex, Text, Button, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "../../onboarding-context";

export default function OnboardingStep4() {
  const { onboardingData, completeOnboarding } = useOnboarding();
  const [feelings, setFeelings] = useState(onboardingData.feelings || "");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const isFeelingsValid = feelings.trim().length >= 3;

  const handleComplete = async () => {
    if (!isFeelingsValid) return;

    setIsLoading(true);
    try {
      // Log the final onboarding data
      console.log("Onboarding completed with data:", onboardingData);

      // Complete the onboarding process
      completeOnboarding();

      // Only navigate if we got here (meaning the above operations succeeded)
      router.push("/dashboard/onboarding/step/5");
    } catch (error) {
      console.error("Failed to complete onboarding:", error);
      alert("Failed to save your response. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
            How do these struggles make you feel?
          </Text>
          <Text mb={4} color="gray.500" fontSize="sm">
            (The more you share the more personalized your affirmations will be)
          </Text>
          <Textarea
            placeholder="Tell us your thoughts..."
            value={feelings}
            onChange={(e) => setFeelings(e.target.value)}
            mb={8}
            minH="120px"
            bg="white"
            disabled={isLoading}
          />
          <Button
            w="full"
            maxW="400px"
            borderRadius="24px"
            bgImage={
              isFeelingsValid
                ? "linear-gradient(90deg, #FF6F61 0%, #A76D99 100%)"
                : "gray.200"
            }
            color={isFeelingsValid ? "white" : "gray.500"}
            _hover={{
              bgImage: isFeelingsValid
                ? "linear-gradient(90deg, #A76D99 0%, #FF6F61 100%)"
                : "gray.200",
              color: isFeelingsValid ? "white" : "gray.500",
              opacity: isFeelingsValid ? 0.9 : 1,
            }}
            fontWeight="bold"
            fontSize="lg"
            py={6}
            onClick={handleComplete}
            disabled={!isFeelingsValid || isLoading}
            _disabled={{
              opacity: 0.7,
              cursor: "not-allowed",
            }}
          >
            {isLoading ? "Saving..." : "Continue"}
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
}
