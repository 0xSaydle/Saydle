"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import {
  Flex,
  Box,
  Heading,
  Text,
  Input,
  Button,
  Link,
  useBreakpointValue,
  Image as ChakraImage,
} from "@chakra-ui/react";
import Image from "next/image";
import login_girl from "@/public/images/login_girl.jpg";
import LoginWithGoogleBtn from "@/components/custom/LoginWithGoogleBtn";
import { MdOutlinePhone } from "react-icons/md";
import { InputGroup } from "@/components/ui/input-group";
import { toaster } from "@/components/ui/toaster";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isValidPhone = (phone: string) => {
    return phone.match(/^\+[0-9]{10,15}$/);
  };

  const sendOtp = async () => {
    if (!isValidPhone(phone)) {
      toaster.create({
        title: "Invalid phone number",
        description:
          "Please enter a valid phone number with country code (e.g. +1234567890)",
        type: "error",
        duration: 3000,
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      const data = await response.json();
      if (data.success) {
        setIsOtpSent(true);
        toaster.create({
          title: "OTP Sent",
          description: `OTP has been sent to ${phone}`,
          type: "success",
          duration: 3000,
        });
      } else {
        toaster.create({
          title: "Error",
          description: data.error || "Failed to send OTP",
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
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    setIsLoading(true);
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
        await signIn("credentials", {
          redirect: false,
          phone,
          otp,
        });
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
      setIsLoading(false);
    }
  };

  const showImage = useBreakpointValue({ base: false, md: true });

  return (
    <Flex
      flex={1}
      align="center"
      justify="center"
      px={{ base: 4, md: 12 }}
      py={8}
      gap={8}
      overflowX={"hidden"}
      bg="#F5F7F9"
    >
      {/* Left: Form */}
      <Box
        p={{ base: 4, md: 8 }}
        borderRadius="lg"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        flex={1}
      >
        <Heading textStyle={"h1"} size="2xl" mb={8}>
          Log In
        </Heading>
        <Text mb={8} color="gray.600">
          We&apos;re glad to have you back!
        </Text>
        {!isOtpSent ? (
          <Box as="form" mb={4}>
            <Text mb={1} fontWeight="medium">
              Enter phone number
            </Text>
            <InputGroup
              width={"100%"}
              mb={2}
              startElement={<MdOutlinePhone size={20} />}
            >
              <Input
                type="tel"
                placeholder="+1234567890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </InputGroup>
            <Button
              w="full"
              mt={4}
              borderRadius="24px"
              bgImage="linear-gradient(90deg, #FF6F61 0%, #A76D99 100%)"
              color="white"
              _hover={{
                bgImage: "linear-gradient(90deg, #A76D99 0%, #FF6F61 100%)",
                color: "white",
              }}
              onClick={sendOtp}
              loading={isLoading}
              loadingText="Sending..."
            >
              Continue
            </Button>
          </Box>
        ) : (
          <Box as="form" mb={4}>
            <Text mb={1} fontWeight="medium">
              Enter OTP
            </Text>
            <Input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              mb={2}
            />
            <Button
              w="full"
              mt={4}
              borderRadius="24px"
              bgImage="linear-gradient(90deg, #FF6F61 0%, #A76D99 100%)"
              color="white"
              _hover={{
                bgImage: "linear-gradient(90deg, #A76D99 0%, #FF6F61 100%)",
                color: "white",
              }}
              onClick={verifyOtp}
              loading={isLoading}
              loadingText="Verifying..."
            >
              Continue
            </Button>
          </Box>
        )}
        <Text mt={4} mb={4} textAlign="center">
          OR
        </Text>
        <LoginWithGoogleBtn prop="in" />
        <Text mt={4} textAlign="center">
          Don&apos;t have an account?{" "}
          <Link
            textDecor={"none"}
            color="#FF6F61"
            href="/register"
            fontWeight="bold"
          >
            Sign Up
          </Link>
        </Text>
      </Box>
      {/* Right: Image (hidden on mobile) */}
      {showImage && (
        <Box
          width={"50vw"}
          bg="#FF6F61"
          py="80px"
          pl="40px"
          hideBelow={"md"}
          mr={"-50px"}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <ChakraImage asChild>
            <Image
              alt="Login Visual"
              src={login_girl}
              style={{
                width: "100%",
                height: "340px",
                objectFit: "cover",
              }}
            />
          </ChakraImage>
        </Box>
      )}
    </Flex>
  );
}
