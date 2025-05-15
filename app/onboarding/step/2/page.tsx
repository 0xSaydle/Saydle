"use client";
import { Box, Flex, Text, Input, Button, HStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding, phoneSchema } from "../../onboarding-context";
import { z } from "zod";

export default function OnboardingStep2() {
  const { onboardingData, setOnboardingData } = useOnboarding();
  const [country, setCountry] = useState(onboardingData.country || "US");
  const [phone, setPhone] = useState(onboardingData.phone || "");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [touched, setTouched] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!touched) return;

    try {
      phoneSchema.parse(phone);
      setError("");
      setIsValid(true);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
        setIsValid(false);
      }
    }
  }, [phone, touched]);

  const handleContinue = () => {
    try {
      // Validate phone number
      phoneSchema.parse(phone);
      setError("");
      setOnboardingData((prev) => ({ ...prev, country, phone }));
      router.push("/onboarding/step/3");
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
            What&apos;s your phone number, {onboardingData.name}?
          </Text>
          <HStack mb={4}>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              style={{
                maxWidth: "100px",
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                background: "white",
              }}
            >
              <option value="US">US</option>
              <option value="NG">NG</option>
              <option value="GB">GB</option>
            </select>
            <Input
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={phone}
              border="1px solid #FfFfFf"
              onChange={(e) => {
                setTouched(true);
                setPhone(e.target.value);
              }}
              onBlur={() => setTouched(true)}
            />
          </HStack>
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
