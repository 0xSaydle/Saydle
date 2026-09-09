"use client";

import { Box, Text, Flex, Icon } from "@chakra-ui/react";
import Link from "next/link";
import { IoMailOutline } from "react-icons/io5";
import { Logo } from "./logo";

const Footer = () => {
  return (
    <Box bg={"secondary.900"} px={{ base: "20px", md: "40px" }} py={{ base: "40px", md: "56px" }}>
      <Flex
        maxW={"1240px"}
        mx={"auto"}
        color={"light.600"}
        direction={{ base: "column", md: "row" }}
        justify={"space-between"}
        align={{ base: "center", md: "flex-end" }}
        gap={"28px"}
      >
        <Flex direction={"column"} align={{ base: "center", md: "flex-start" }} gap={"12px"}>
          <Logo css={{ color: "white" }} />
          <Text color={"dark.100"} textStyle={"body_sm"}>
            © 2026 Saydle. All rights reserved.
          </Text>
        </Flex>

        <Flex direction={"column"} align={{ base: "center", md: "flex-end" }} gap={"16px"}>
          <Flex
            gap={"10px"}
            align={"center"}
            textStyle={"title"}
            color={"white"}
            border={"1px solid"}
            borderColor={"whiteAlpha.400"}
            borderRadius={"card"}
            px={"20px"}
            py={"12px"}
            _hover={{ borderColor: "white", bg: "whiteAlpha.100" }}
            asChild
          >
            <a href="mailto:support@saydle.com">
              <Icon asChild fontSize={"22px"}>
                <IoMailOutline />
              </Icon>
              support@saydle.com
            </a>
          </Flex>
          <Flex gap={"20px"} textStyle={"body_sm"}>
            <Box _hover={{ color: "white" }} asChild>
              <Link href={"/privacy"}>Privacy</Link>
            </Box>
            <Box _hover={{ color: "white" }} asChild>
              <Link href={"/terms"}>Terms</Link>
            </Box>
            <Box _hover={{ color: "white" }} asChild>
              <Link href={"/#get-the-app"}>Get the app</Link>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
