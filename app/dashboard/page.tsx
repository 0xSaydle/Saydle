"use client";
import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Headphone from "@/public/icons/headphone.svg";
import Image from "next/image";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session } = useSession();
  
  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("/api/affirmation");
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch profile");
        console.log(data)
        
      } catch (error: any) {
        console.log(error);
      }
    }
    fetchProfile();
  }, []);

  return (
    <>
      {/* Greeting */}
      <Box textStyle={"menu"} mb={2} mt={2}>
        Hey {session?.user?.name || "there"}-
        <Box textStyle={"body_lg"} as="span" color="gray.500">
          {" "}
          here&apos;s what&apos;s happening in your account today
        </Box>
      </Box>

      {/* Affirmation Card */}
      <Box
        bg="#fff"
        borderRadius="lg"
        p={{ base: 4, md: 8 }}
        boxShadow="sm"
        border="1px solid #F0F0F0"
        mb={8}
        maxW="900px"
      >
        <Box color={"dark.500"} w="100%" textStyle={"h6"} textAlign="center">
          Remember, every small step you take is progress. You are doing
          wonderfully
        </Box>
        <Flex
          justifyContent={"flex-end"}
          fontSize="sm"
          color="gray.500"
          mt={2}
          gap={1}
        >
          <Text fontWeight={700} color={"dark.300"}>
            Saydle
          </Text>
          affirmations
        </Flex>
      </Box>

      {/* Status Cards */}
      <Flex gap={6} mb={8} flexWrap="wrap">
        <Box
          bg="#fff"
          borderRadius="lg"
          p={6}
          boxShadow="sm"
          border="1px solid #F0F0F0"
          minW="220px"
          flex={1}
          maxW="300px"
        >
          <Box fontSize="xs" color="dark.300" mb={1} fontWeight="500">
            SUBSCRIPTION STATUS
          </Box>
          <Flex gap={2} align="center">
            <Box
              w={2}
              h={2}
              borderRadius="full"
              bg={session?.user?.plan === "BASIC" ? "red.400" : "green.400"}
            />
            <Box fontWeight="bold" color="dark.500">
              {session?.user?.plan === "BASIC" ? "Inactive" : "Active"} -{" "}
              {session?.user?.plan && typeof session.user.plan === "string"
                ? session.user.plan.charAt(0) +
                  session.user.plan.slice(1).toLowerCase()
                : "No plan"}
            </Box>
          </Flex>
        </Box>
        <Box
          bg="#fff"
          borderRadius="lg"
          p={6}
          boxShadow="sm"
          border="1px solid #F0F0F0"
          minW="220px"
          flex={1}
          maxW="300px"
        >
          <Box fontSize="xs" color="dark.300" mb={1} fontWeight="500">
            NEXT BILLING DATE
          </Box>
          <Box fontWeight="bold" fontSize="lg">
            {session?.user?.nextBillingDate
              ? new Date(session.user.nextBillingDate).toLocaleDateString(
                  "en-US",
                  {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }
                )
              : "Not set"}
          </Box>
        </Box>
      </Flex>

      {/* Customer Support Card */}
      <Box mt={8} maxW="300px">
        <Flex
          bg="#fff"
          borderRadius="lg"
          p={6}
          boxShadow="sm"
          border="1px solid #F0F0F0"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Box color={"dark.300"} fontSize={"12px"} fontWeight={500} mb={2}>
            CUSTOMER SUPPORT
          </Box>
          <Box mb={4}>
            <Image src={Headphone} alt="Headphone" />
          </Box>
          <Box
            asChild
            color="#fff"
            bg="#FF6F61"
            borderRadius="full"
            px={8}
            py={2}
            fontWeight="bold"
            _hover={{ bg: "#A76D99", textDecoration: "none" }}
            aria-label="Contact customer support"
            style={{
              display: "inline-block",
              marginTop: 8,
              textDecoration: "none",
            }}
          >
            <Link href="mailto:support@saydle.com">Contact</Link>
          </Box>
        </Flex>
      </Box>

      {/* Note */}
      <Box fontSize="xs" color="gray.500" mt={8}>
        *To manage or cancel your subscription, simply navigate to the
        subscription option in the dashboard menu.
      </Box>
    </>
  );
}
