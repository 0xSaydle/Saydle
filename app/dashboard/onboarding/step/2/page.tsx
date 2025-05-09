"use client";
import { Box, Flex, Text, Input, Button, Link, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useOnboarding } from "../../onboarding-context";

export default function OnboardingStep2() {
  const { onboardingData, setOnboardingData } = useOnboarding();
  const [country, setCountry] = useState(onboardingData.country || "US");
  const [phone, setPhone] = useState(onboardingData.phone || "");
  const [code, setCode] = useState(onboardingData.code || "");
  const router = useRouter();

  const handleContinue = () => {
    setOnboardingData((prev) => ({ ...prev, country, phone, code }));
    router.push("/dashboard/onboarding/step/3");
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
            Whats your Phone number, Alex?
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
              onChange={(e) => setPhone(e.target.value)}
            />
          </HStack>
          <Text mb={1}>Verification code</Text>
          <Input
            type="text"
            placeholder="------"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            mb={2}
          />
          <Link color="#A76D99" fontSize="sm" mb={6} display="block" href="#">
            Click here to get/resend
          </Link>
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
