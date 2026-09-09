"use client";

import { Box, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { GeneralSans } from "./fonts";
import { Logo } from "@/components/custom/logo";
import Button from "@/components/custom/button";

const NotFound = () => {
  const router = useRouter();

  return (
    <Box
      minH="100vh"
      bg="light.bg"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      px={5}
      className={GeneralSans.className}
    >
      <Box mb={8} color="primary.20">
        <Logo />
      </Box>
      <Flex direction="column" align="center" textAlign="center" maxW="480px">
        <Text textStyle="d1" color="primary.20" lineHeight="1" mb={4}>
          404
        </Text>
        <Text textStyle="h4" color="dark.500" mb={3}>
          This page isn’t here
        </Text>
        <Text textStyle="body_lg" color="dark.300" mb={8}>
          The page you’re looking for doesn’t exist, or it moved when Saydle
          became a mobile app.
        </Text>
        <Flex gap={3} flexWrap="wrap" justify="center">
          <Button text="Go home" path="/" />
          <Box
            layerStyle="pill.outline"
            cursor="pointer"
            onClick={() => router.back()}
          >
            Go back
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default NotFound;
