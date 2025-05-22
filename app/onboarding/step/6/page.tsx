"use client";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import * as Chakra from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import happy_couple from "@/public/images/happy_couple.png";
import adorable_couple from "@/public/images/adorable_couple.png";

export default function OnboardingStep6() {
  const router = useRouter();

  return (
    <Flex
      direction="column"
      align="center"
      minH="100vh"
      bg="#F5F7F9"
      position="relative"
      px={4}
      pt={"10%"}
      overflow="hidden"
    >
      {/* Main Content */}
      <Box textAlign="center" zIndex={1} maxW="lg" w="full">
        <Text fontSize={{ base: "3xl", md: "4xl" }} fontWeight="normal" mb={2}>
          Welcome to{" "}
          <Box as="span" color="#A76D99" fontWeight="bold" display="inline">
            Saydle
          </Box>
        </Text>
        <Text fontSize="lg" color="gray.600" mb={8}>
          Daily affirmations crafted uniquely for you.
        </Text>
        <Button
          w="full"
          maxW="400px"
          borderRadius="24px"
          bgImage="linear-gradient(90deg, #FF6F61 0%, #A76D99 100%)"
          color="white"
          _hover={{
            bgImage: "linear-gradient(90deg, #A76D99 0%, #FF6F61 100%)",
            color: "white",
            opacity: 0.9,
          }}
          fontWeight="bold"
          fontSize="lg"
          py={6}
          onClick={() => router.push("/dashboard")}
        >
          Continue
        </Button>
      </Box>

      {/* Bottom Images */}
      <Box
        position="absolute"
        left={0}
        bottom={0}
        zIndex={0}
        display={{ base: "none", md: "block" }}
        maxH="100vh"
      >
        <Chakra.Image
          asChild
          borderRadius="xl"
          boxShadow="lg"
          height={"55vw"}
          width="auto"
        >
          <Image src={adorable_couple} alt="Happy group left" />
        </Chakra.Image>
      </Box>
      <Box
        position="absolute"
        right={0}
        bottom={0}
        zIndex={0}
        display={{ base: "none", md: "block" }}
        maxH="100vh"
      >
        <Chakra.Image
          asChild
          borderRadius="xl"
          boxShadow="lg"
          height={"30vw"}
          width="auto"
        >
          <Image src={happy_couple} alt="Happy group right" />
        </Chakra.Image>
      </Box>
      {/* Mobile images */}
      <Flex
        w="full"
        justify="space-between"
        position="absolute"
        bottom={0}
        left={0}
        px={4}
        display={{ base: "flex", md: "none" }}
        hideFrom={"md"}
        maxH="100vh"
      >
        <Chakra.Image
          asChild
          borderRadius="xl"
          boxShadow="lg"
          height={"30vw"}
          width="auto"
        >
          <Image src={adorable_couple} alt="Happy group left" />
        </Chakra.Image>
        <Chakra.Image
          asChild
          borderRadius="xl"
          boxShadow="lg"
          height={"30vw"}
          width="auto"
        >
          <Image
            src={happy_couple}
            alt="Happy group right"
            width={120}
            height={120}
            style={{ width: "auto", height: "80px" }}
          />
        </Chakra.Image>
      </Flex>
    </Flex>
  );
}
