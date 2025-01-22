import { Box, Text, Flex, Icon } from "@chakra-ui/react";
import Link from "next/link";
import { IoMailOutline } from "react-icons/io5";

const Footer = () => {
  return (
    <Flex justifyContent={"center"}
      bg={"secondary.900"}
      color={"light.500"}
      padding={{ base: "35px" }}
      asChild
    >
      <Flex>
        <div>
          <Flex my={"20px"} gap={"20px"}
          alignItems={"center"}
          textAlign={"center"} textStyle={"title"} asChild>

            <a href="mailto:support@rareblocks.xyz"> <IoMailOutline /> support@rareblocks.xyz</a>
          </Flex>
          <Flex
            gap={"20px"}
            justifyContent={"center"}
            alignItems={"center"}
            padding={"16px 20px"}
            asChild
            >
            <div>
              <Link href={"/about"}>About</Link>
              <Link href={"/api"}>How it works</Link>
              <Link href={"/faq"}>FAQs</Link>
            </div>
          </Flex>
          <Box hideFrom={"sm"} asChild>
            <hr />
          </Box>
          <Text
            textAlign={{ base: "center" }}
            fontSize={{ base: "52px" }}
            fontWeight={900}
          >
            Saydle
          </Text>
          <Box hideBelow={"sm"} asChild>
            <hr />
          </Box>
          <Text color={ "dark.100"} textAlign={"center"} textStyle={"body_sm"}>
          © Copyright 2021, All Rights Reserved
          </Text>
        </div>
      </Flex>
    </Flex>
  );
};

export default Footer;
