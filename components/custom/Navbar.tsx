"use client";
import { Flex, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { Logo } from "./logo";

const Navbar = () => {
  const [menu, setMenu] = useState("off");
  const toggleMenu = () => {
    setMenu(menu === "on" ? "off" : "on");
  };
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      direction={"row"}
      p={{ lg: "0px", md: "0px" }}
    >
  
        <Logo />
        <Flex
          hideBelow={"md"}
          transform={"translateX(20%)"}
          asChild
          gap={"40px"}
        >
          {/* Nav Items */}
          <div>
            <Text asChild>
              <Link href="/">Home</Link>
            </Text>
            <Text asChild>
              <Link href="/about">About</Link>
            </Text>
            <Text asChild>
              <Link href="/faq">{"FAQ's"}</Link>
            </Text>
          </div>
        </Flex>
        <Flex
          hideBelow={"md"}
          bgColor={"light.400"}
          p={"8px"}
          gap={"12px"}
          borderRadius={"36px"}
          alignItems={"center"}
          textStyle={"button_lg"}
        >
            <Text p={"12px 24px"} asChild>
              <Link href="/login">Log In</Link>
            </Text>
            <Text
              bgColor={"primary.20"}
              color={"white"}
              borderRadius={"24px"}
              p={"12px 24px"}
              asChild
            >
              <Link href="/register">Register</Link>
            </Text>
        </Flex>
        <Icon
          hideFrom={"md"}
          cursor={"pointer"}
          fontSize={"23px"}
          asChild
          onClick={toggleMenu}
        >
          <IoMenu />
        </Icon>
        <Flex
          padding={{ base: "15px", sm: "40px" }}
          zIndex={"20000"}
          position={"fixed"}
          right={"0px"}
          top={"0px"}
          data-state={menu}
          width="100vw"
          height={"100vh"}
          backgroundColor={"#f0f0f0"}
          display={menu === "on" ? "flex" : "none"}
          visibility={menu === "on" ? "visible" : "hidden"}
          flexDirection={menu === "on" ? "column" : undefined}
          gap={menu === "on" ? "30px" : undefined}
          textStyle={menu === "on" ? "menu_lg" : undefined}
          alignItems={menu === "on" ? "start" : undefined}
        >
        
            <Flex
              justifyContent={"space-between"}
              alignItems={"center"}
              position={"relative"}
              width={"100%"}
              mb={"40px"}
              css={{
                justifyContent: "space-between",
              }}
            >
              <Logo
                css={{
                  "&:hover": {
                    color: "red.400",
                  },
                }}
              />
              <Icon
                onClick={toggleMenu}
                cursor={"pointer"}
                fontSize={"23px"}
                _hover={{
                  color: "red.400",
                }}
                asChild
              >
                <IoClose />
              </Icon>
            </Flex>

            <Text asChild>
              <Link href="/">Home</Link>
            </Text>
            <Text asChild>
              <Link href="/about">About</Link>
            </Text>
            <Text asChild>
              <Link href="/faq">{"FAQ's"}</Link>
            </Text>
        </Flex>
    </Flex>
  );
};

export default Navbar;
