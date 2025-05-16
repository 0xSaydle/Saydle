"use client";
import {
  Box,
  Flex,
  Text,
  Input,
  Image as ChakraImage,
  Link,
} from "@chakra-ui/react";
import LoginWithGoogleBtn from "@/components/custom/LoginWithGoogleBtn";
import Image from "next/image";
import form_banner from "@/public/images/register_girl.svg";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field } from "@/components/ui/field";
import { InputGroup } from "@/components/ui/input-group";
import { MdOutlinePhone } from "react-icons/md";
import { toaster } from "@/components/ui/toaster";

const RegisterPage = () => {
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic phone validation - ensure it starts with + and has at least 10 digits
    if (!phone || !phone.match(/^\+[0-9]{10,15}$/)) {
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
        toaster.create({
          title: "OTP Sent",
          description: `OTP has been sent to ${phone}`,
          type: "success",
          duration: 3000,
        });

        // Redirect to verify OTP page with phone in query params
        router.push(`/verify-otp?phone=${encodeURIComponent(phone)}`);
      } else {
        toaster.create({
          title: "Error",
          description: data.error || "Failed to send OTP",
          type: "error",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
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

  return (
    <Flex gap={"5px"} justifyContent={"space-between"} mt={"0%"}>
      <Flex
        flexDirection={"column"}
        gap={"10px"}
        width={{ md: "50vw", sm: "100%" }}
        padding={"40px"}
      >
        <Text textStyle={"h1"}>Welcome!</Text>
        <Text textStyle={"sub"}>Your new way to form healthy habits</Text>
        <Flex pt={"10px"} gap={"20px"} flexDirection={"column"}>
          <form onSubmit={handleSubmit}>
            <Field
              label="Sign up with phone number"
              errorText="This field is required"
            >
              <InputGroup
                width={"100%"}
                flex="1"
                startElement={<MdOutlinePhone />}
              >
                <Input
                  name="phone"
                  size={"md"}
                  required
                  placeholder="+1234567890"
                  width={"100%"}
                  value={phone}
                  onChange={handlePhoneChange}
                />
              </InputGroup>
            </Field>
            <Box
              mt={"10px"}
              color={"white"}
              rounded={"lg"}
              textStyle={"button_sm"}
              width={"100%"}
              padding="8px 12px"
              background={"secondary.600"}
              as="button"
              opacity={isLoading ? 0.7 : 1}
              _hover={{ opacity: isLoading ? 0.7 : 0.9 }}
              cursor={isLoading ? "not-allowed" : "pointer"}
            >
              {isLoading ? "Sending..." : "Sign Up"}
            </Box>
          </form>
        </Flex>
        <Text m={"10px auto"}>OR</Text>
        <LoginWithGoogleBtn prop="up" />
        <Text mt={4} textAlign="center">
          Already have an account?{" "}
          <Link
            textDecor={"none"}
            color="secondary.600"
            href="/login"
            fontWeight="bold"
          >
            Sign In
          </Link>
        </Text>
      </Flex>
      <Box
        width={"50vw"}
        backgroundColor={"secondary.600"}
        py="50px"
        pl="50px"
        hideBelow={"md"}
        mr={"-27px"}
      >
        <ChakraImage asChild>
          <Image alt="banner" src={form_banner} />
        </ChakraImage>
      </Box>
    </Flex>
  );
};

export default RegisterPage;
