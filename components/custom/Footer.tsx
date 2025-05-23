import { Box, Text, Flex, Icon } from "@chakra-ui/react";
import Link from "next/link";
import { IoMailOutline } from "react-icons/io5";

const Footer = () => {
  return (
    <Box bg={"secondary.900"}
    padding={{ base: "15px", sm: "30px 40px", md:"4%" }}>
      <Flex
        color={"light.500"}
        flexDir={{ base: "column", md: "row-reverse" }}
        justifyContent={{ base: "center", md: "space-between" }}
        gap={"20px"}

            pb={"16px"}
      >
        <Flex justifyContent={{md:"space-between"}} flexDir={"column"} gap={"20px"} textAlign={"center"}>
          <Flex
            my={"20px"}
            gap={"20px"}
            alignItems={"center"}
            textAlign={"center"}
            textStyle={"title"}
            border={".5px solid #f8f8f8"}
            borderRadius={"20px"}
            p={"16px 20px"}
            asChild
          >
            <a href="mailto:support@rareblocks.xyz">
              <Icon asChild fontSize={"25px"}>
                <IoMailOutline />
              </Icon> support@rareblocks.xyz
            </a>
          </Flex>
          <Flex
            gap={"20px"}
            justifyContent={"center"}
            alignItems={"center"}
          >
              <Link href={"/about"}>About</Link>
              <Link href={"/api"}>How it works</Link>
              <Link href={"/faq"}>FAQs</Link>
          </Flex>
        </Flex>

        <Flex justifyContent={{md:"space-between"}} alignItems={{md:"start"}} flexDir={"column"} gap={"20px"} textAlign={"center"}>
          <Box hideFrom={"sm"} opacity={".5"} asChild>
            <hr />
          </Box>
          <Text
            textAlign={{ base: "center" }}
            fontSize={{ base: "52px" }}
            fontWeight={900}
          >
            Saydle
          </Text>
          <Text color={"dark.100"} textAlign={"center"} textStyle={"body_sm"}>
            © Copyright 2021, All Rights Reserved
          </Text>
        </Flex>
      </Flex>
      <Box hideBelow={"sm"} opacity={".8"} asChild>
        <hr />
      </Box>
      <br />
    </Box>
  );
};

export default Footer;
