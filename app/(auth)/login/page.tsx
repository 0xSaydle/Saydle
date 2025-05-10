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
import { MdOutlineEmail } from "react-icons/md";
import { InputGroup } from "@/components/ui/input-group";

export default function Login() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [message, setMessage] = useState("");

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const sendOtp = async () => {
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    const response = await fetch("/api/auth/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    if (data.success) {
      setIsOtpSent(true);
      setMessage("Sent OTP to: " + email);
    } else {
      setMessage("Failed to send OTP.");
    }
  };

  const verifyOtp = async () => {
    const response = await fetch("/api/auth/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    const data = await response.json();
    if (data.success) {
      setMessage(data.message);
      await signIn("credentials", {
        redirect: false,
        email,
        otp,
      });
    } else {
      setMessage("Invalid OTP.");
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
              Enter email address
            </Text>
            <InputGroup
              width={"100%"}
              mb={2}
              startElement={<MdOutlineEmail size={20} />}
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            >
              Continue
            </Button>
            {error && (
              <Text color="red.500" mt={2}>
                {error}
              </Text>
            )}
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
            >
              Continue
            </Button>
          </Box>
        )}
        {message && (
          <Text color="gray.600" mt={2}>
            {message}
          </Text>
        )}
        <Text mt={4} mb={4} textAlign="center">
          OR
        </Text>
        <LoginWithGoogleBtn prop="in" />
        <Text mt={4} textAlign="center">
          Don&apos;t have an account?{" "}
          <Link textDecor={"none"} color="#FF6F61" href="/register" fontWeight="bold">
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
