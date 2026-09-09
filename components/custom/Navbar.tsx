"use client";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { Logo } from "./logo";
import Button from "./button";

const links = [
  { href: "/", label: "Home" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      gap={"16px"}
      py={{ base: "4px", md: "8px" }}
    >
      <Logo />

      <Flex
        hideBelow={"md"}
        gap={"32px"}
        textStyle={"body_lg"}
        color={"dark.400"}
        asChild
      >
        <nav>
          {links.map((link) => (
            <Text
              key={link.href}
              _hover={{ color: "dark.500" }}
              asChild
            >
              <Link href={link.href}>{link.label}</Link>
            </Text>
          ))}
        </nav>
      </Flex>

      <Flex hideBelow={"md"}>
        <Button text="Get the app" path="/#get-the-app" />
      </Flex>

      <Box
        hideFrom={"md"}
        as="button"
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        cursor={"pointer"}
        fontSize={"28px"}
        lineHeight={1}
        bg={"transparent"}
        border={"none"}
        p={0}
        onClick={() => setOpen((value) => !value)}
      >
        <IoMenu />
      </Box>

      <Flex
        display={open ? "flex" : "none"}
        position={"fixed"}
        inset={0}
        zIndex={20000}
        bg={"light.bg"}
        direction={"column"}
        gap={"24px"}
        p={"20px"}
        textStyle={"h5"}
      >
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Logo />
          <Icon
            cursor={"pointer"}
            fontSize={"28px"}
            aria-label="Close menu"
            asChild
            onClick={() => setOpen(false)}
          >
            <IoClose />
          </Icon>
        </Flex>
        {links.map((link) => (
          <Text key={link.href} asChild>
            <Link href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          </Text>
        ))}
        <Button
          text="Get the app"
          path="/#get-the-app"
          onClick={() => setOpen(false)}
        />
      </Flex>
    </Flex>
  );
};

export default Navbar;
