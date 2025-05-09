"use client";
import { signIn } from "next-auth/react";
import { Box, Icon, Text } from "@chakra-ui/react";
import Image from "next/image";
import google from "@/public/Google_Icon.webp";

const LoginWithGoogleBtn = ({ prop }: { prop: string }) => {
  return (
    <Box
      padding={"8px 16px"}
      border={"1px solid grey"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      rounded={"lg"}
      cursor={"pointer"}
      w={"100%"}
      onClick={() =>
        signIn("google", {
          callbackUrl: "/settings",
          redirect: true,
        })
      }
    >
      <Icon ml={"-4px"} fontSize={"24px"} asChild>
        <Image src={google} alt="Google_icon"></Image>
      </Icon>
      <Text fontSize={"14px"}>Sign {prop} with Google</Text>
    </Box>
  );
};

export default LoginWithGoogleBtn;
