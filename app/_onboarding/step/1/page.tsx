"use client";
import { Box, Flex, Text, Input, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding, nameSchema } from "../../onboarding-context";
import { z } from "zod";

export default function OnboardingStep1() {
  const { onboardingData, setOnboardingData } = useOnboarding();
  const [name, setName] = useState(onboardingData.name || "");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!touched) return;

    try {
      nameSchema.parse(name);
      setError("");
      setIsValid(true);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
        setIsValid(false);
      }
    }
  }, [name, touched]);

  const handleContinue = async () => {
    try {
      // Validate name
      nameSchema.parse(name);

      // Update context
      setOnboardingData((prev) => ({ ...prev, name }));

      // Navigate to next step
      router.push("/onboarding/step/2");
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
        setIsValid(false);
      }
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
            placeholder="Enter your name"
            value={name}
            onChange={(e) => {
              setTouched(true);
              setName(e.target.value);
            }}
            onBlur={() => setTouched(true)}
            mb={2}
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
            color={isValid ? "white" : "gray.400"}
            _hover={{
              bg: isValid ? "#A76D99" : "gray.200",
              color: isValid ? "white" : "gray.400",
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
