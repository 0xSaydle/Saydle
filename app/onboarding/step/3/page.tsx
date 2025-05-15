"use client";
import { Box, Flex, Text, Input, Button, Textarea } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "../../onboarding-context";

export default function OnboardingStep3() {
  const { onboardingData, setOnboardingData } = useOnboarding();
  const [weaknesses, setWeaknesses] = useState(onboardingData.weaknesses || "");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!touched) return;

    if (weaknesses.trim().length > 0) {
      setError("");
      setIsValid(true);
    } else {
      setError("Please share something you're struggling with");
      setIsValid(false);
    }
  }, [weaknesses, touched]);

  const handleContinue = () => {
    if (!isValid) return;
    setOnboardingData((prev) => ({ ...prev, weaknesses }));
    router.push("/onboarding/step/4");
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
          Let&apos;s improve your mental health
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
            What&apos;s something you&apos;ve been struggling with?
          </Text>
          <Text mb={4} color="gray.500" fontSize="sm">
            (The more you share the more personalized your affirmations will be)
          </Text>
          <Textarea
            placeholder="Tell us your thoughts..."
            value={weaknesses}
            onChange={(e) => {
              setTouched(true);
              setWeaknesses(e.target.value);
            }}
            onBlur={() => setTouched(true)}
            mb={8}
            minH="120px"
            bg="white"
            border="1px solid #FfFfFf"
          />
          {touched && error && (
            <Text color="red.500" fontSize="sm" mb={4}>
              {error}
            </Text>
          )}
          <Button
            w="full"
            borderRadius="24px"
            bg={isValid ? "#FF6F61" : "gray.200"}
            color={isValid ? "white" : "gray.500"}
            _hover={{
              bg: isValid ? "#A76D99" : "gray.200",
              color: isValid ? "white" : "gray.500",
            }}
            fontWeight="bold"
            fontSize="16px"
            py={6}
            onClick={handleContinue}
            disabled={!isValid}
            _disabled={{
              opacity: 0.7,
              cursor: "not-allowed",
            }}
          >
            Continue
          </Button>
        </Box>
      </Flex>
    </Flex>
  );
}
