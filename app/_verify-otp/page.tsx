"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Box, Flex, Heading, Text, Button, Link } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";

function VerifyOTPContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const phone = searchParams.get("phone");
  const [otp, setOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [resendDisabled, setResendDisabled] = useState(true);

  // Redirect if no phone is provided
  useEffect(() => {
    if (!phone) {
      router.push("/register");
    }
  }, [phone, router]);

  // Countdown timer for OTP expiration
  useEffect(() => {
    if (timeLeft <= 0) {
      setResendDisabled(false);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleVerify = async () => {
    if (!otp || otp.length !== 6) {
      toaster.create({
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP",
        type: "error",
        duration: 3000,
      });
      return;
    }

    setIsVerifying(true);

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });

      const data = await response.json();

      if (data.success) {
        toaster.create({
          title: "Success",
          description: "OTP verified successfully",
          type: "success",
          duration: 3000,
        });

        // Redirect to dashboard or onboarding
        router.push("/dashboard/onboarding/step/1");
      } else {
        toaster.create({
          title: "Error",
          description: data.error || "Invalid OTP",
          type: "error",
          duration: 3000,
        });
      }
    } catch {
      toaster.create({
        title: "Error",
        description: "An unexpected error occurred",
        type: "error",
        duration: 3000,
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    setResendDisabled(true);

    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await response.json();

      if (data.success) {
        toaster.create({
          title: "OTP Resent",
          description: `A new OTP has been sent to ${phone}`,
          type: "success",
          duration: 3000,
        });

        // Reset timer
        setTimeLeft(300);
      } else {
        toaster.create({
          title: "Error",
          description: data.error || "Failed to resend OTP",
          type: "error",
          duration: 3000,
        });
        setResendDisabled(false);
      }
    } catch {
      toaster.create({
        title: "Error",
        description: "An unexpected error occurred",
        type: "error",
        duration: 3000,
      });
      setResendDisabled(false);
    }
  };

  // Handle manual OTP input
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow digits and limit to 6 characters
    if (/^\d*$/.test(value) && value.length <= 6) {
      setOtp(value);
    }
  };

  return (
    <Flex minHeight="100vh" align="center" justify="center" bg="#F5F7F9" p={4}>
      <Box
        p={8}
        maxWidth="500px"
        width="100%"
        borderRadius="lg"
        bg="white"
        boxShadow="md"
      >
        <Heading size="xl" mb={6} textAlign="center">
          Verify Your Phone
        </Heading>

        <Text mb={6} textAlign="center" color="gray.600">
          We&apos;ve sent a 6-digit verification code to{" "}
          <strong>{phone}</strong>
        </Text>

        <Text mb={2} fontWeight="medium" textAlign="center">
          Enter verification code
        </Text>

        <Box mb={6}>
          <Flex justify="center">
            <input
              type="text"
              value={otp}
              onChange={handleOtpChange}
              placeholder="Enter 6-digit code"
              style={{
                width: "200px",
                padding: "12px",
                fontSize: "18px",
                textAlign: "center",
                letterSpacing: "8px",
                border: "1px solid #E2E8F0",
                borderRadius: "8px",
              }}
            />
          </Flex>
        </Box>

        <Text mb={6} textAlign="center" color="gray.500" fontSize="sm">
          Code expires in: <strong>{formatTime(timeLeft)}</strong>
        </Text>

        <Button
          w="full"
          colorScheme="blue"
          onClick={handleVerify}
          disabled={isVerifying}
          mb={4}
          borderRadius="24px"
          bgImage="linear-gradient(90deg, #FF6F61 0%, #A76D99 100%)"
          color="white"
          _hover={{
            bgImage: "linear-gradient(90deg, #A76D99 0%, #FF6F61 100%)",
          }}
        >
          {isVerifying ? "Verifying..." : "Verify & Continue"}
        </Button>

        <Flex justify="center" align="center" gap={2}>
          <Text color="gray.600" fontSize="sm">
            Didn&apos;t receive the code?
          </Text>
          <Button
            variant="ghost"
            color="secondary.600"
            fontSize="sm"
            disabled={resendDisabled}
            onClick={handleResendOTP}
          >
            Resend
          </Button>
        </Flex>

        <Text mt={4} textAlign="center" fontSize="sm">
          <Link color="secondary.600" href="/register">
            Use a different phone number
          </Link>
        </Text>
      </Box>
    </Flex>
  );
}

export default function VerifyOTP() {
  return (
    <Suspense
      fallback={
        <Flex
          minHeight="100vh"
          align="center"
          justify="center"
          bg="#F5F7F9"
          p={4}
        >
          <Box
            p={8}
            maxWidth="500px"
            width="100%"
            borderRadius="lg"
            bg="white"
            boxShadow="md"
          >
            <Text textAlign="center">Loading...</Text>
          </Box>
        </Flex>
      }
    >
      <VerifyOTPContent />
    </Suspense>
  );
}
