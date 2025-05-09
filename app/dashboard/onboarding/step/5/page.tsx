"use client";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useOnboarding } from "../../onboarding-context";
import { MdCheckCircle } from "react-icons/md";

const plans = [
  {
    key: "basic",
    name: "Basic",
    desc: "Lorem ipsum dolor sit amet, consce tatur adipis elit",
    price: "$0",
    priceDetail: "/mo/user",
    button: "Subscribe to our Basic Plan",
    features: [
      "Daily affirmations tailored to your needs",
      "Flexible billing with the option to cancel anytime",
      "Priority support for any subscription-related queries",
      "Exclusive access to seasonal wellness tips",
    ],
    color: "gray.400",
    buttonColor: "gray.300",
    selected: false,
  },
  {
    key: "pro",
    name: "Pro",
    desc: "Lorem ipsum dolor sit amet, consce tatur adipis elit",
    price: "$49",
    priceDetail: "/mo/user",
    button: "Subscribe to our Pro Plan",
    features: [
      "Daily affirmations tailored to your needs",
      "Flexible billing with the option to cancel anytime",
      "Priority support for any subscription-related queries",
      "Exclusive access to seasonal wellness tips",
    ],
    color: "#FF6F61",
    buttonColor: "#FF6F61",
    selected: false,
  },
  {
    key: "premium",
    name: "Premium",
    desc: "Lorem ipsum dolor sit amet, consce tatur adipis elit",
    price: "$49",
    priceDetail: "/mo/user",
    button: "Subscribe to our Pro Plan",
    features: [
      "Daily affirmations tailored to your needs",
      "Flexible billing with the option to cancel anytime",
      "Priority support for any subscription-related queries",
      "Exclusive access to seasonal wellness tips",
    ],
    color: "#A76D99",
    buttonColor: "#A76D99",
    selected: false,
  },
];

export default function OnboardingStep5() {
  const { onboardingData, setOnboardingData } = useOnboarding();
  const [selected, setSelected] = useState(onboardingData.plan || "basic");

  const handleSubscribe = (planKey: string) => {
    setSelected(planKey);
    setOnboardingData((prev) => ({ ...prev, plan: planKey }));
    // You can navigate to the next step or payment here
    // router.push("/dashboard/onboarding/step/6");
  };

  return (
    <Flex
      flex={1}
      align="center"
      justify="center"
      direction={{ base: "column", md: "row" }}
      bg="#F5F7F9"
      minH="100%"
    >
      {/* Sidebar */}
      <Box
        minW={{ base: "100%", md: "250px" }}
        maxW={{ md: "400px" }}
        borderRight={{ base: "none", md: "1px solid #eee" }}
        borderBottom={{ base: "1px solid #eee", md: "none" }}
        py={8}
        px={8}
        bg="transparent"
        display="flex"
        flexDirection="column"
        alignItems={{ base: "center", md: "flex-start" }}
        textAlign={{ base: "center", md: "left" }}
      >
        <Text color="#FF6F61" fontWeight="bold" fontSize="20px" mb={2}>
          Billing & Payment
        </Text>
        <Text fontWeight="bold" mb={1}>
          Choose a plan
        </Text>
        <Text color="gray.600" mb={6}>
          Make payment for your plan and start receiving affirmations
        </Text>
        <Box
          mt={4}
          mb={2}
          alignSelf={{ base: "center", md: "flex-start" }}
          width="150px"
          height="150px"
          border="1px solid #eee"
          borderRadius="12px"
        />
      </Box>
      {/* Main Content */}
      <Flex
        flex={1}
        align="center"
        justify="center"
        w={{ base: "100%", md: "100vw" }}
        bg="#F5F7F9"
      >
        <Flex
          gap={6}
          mt={{ base: 4, md: 12 }}
          direction={{ base: "column", md: "row" }}
          w="100%"
          maxW="100vw"

        flexWrap={"wrap"}
          px={4}
          justify="space-between"
          align="stretch"
        >
          {plans.map((plan) => (
            <Box
              key={plan.key}
              border="1px solid #eee"
              borderRadius="16px"
              p={6}
              flex="1 1 0"
              minW={{ base: "100%", md: "280px" }}
              maxW={{ base: "100%", md: "380px" }}
              bg={selected === plan.key ? "#FFF6F4" : "white"}
              boxShadow={
                selected === plan.key ? "0 0 0 2px #FF6F61" : undefined
              }
              transition="box-shadow 0.2s, background 0.2s"
              display="flex"
              flexDirection="column"
            >
              <Text fontWeight="bold" fontSize="18px" mb={1}>
                {plan.name}
              </Text>
              <Text color="gray.500" fontSize="sm" mb={2}>
                {plan.desc}
              </Text>
              <Text fontWeight="bold" fontSize="32px" color={plan.color} mb={0}>
                {plan.price}
                <Text
                  as="span"
                  fontWeight="normal"
                  fontSize="16px"
                  color="gray.400"
                >
                  {plan.priceDetail}
                </Text>
              </Text>
              <Button
                w="full"
                mt={3}
                mb={3}
                borderRadius="24px"
                bg={plan.buttonColor}
                color={plan.key === "basic" ? "gray.700" : "white"}
                fontWeight="bold"
                fontSize="14px"
                onClick={() => handleSubscribe(plan.key)}
                _hover={{ bg: plan.buttonColor, opacity: 0.9 }}
                _active={{ bg: plan.buttonColor, opacity: 0.9 }}
              >
                {plan.button}
              </Button>
              <Text fontWeight="bold" fontSize="14px" mt={2} mb={1}>
                Features
              </Text>
              <Box as="ul" listStyleType="none" mt={2} flex="1">
                {plan.features.map((feature, i) => (
                  <Box as="li" key={i} color="gray.700" fontSize="13px" mb={2}>
                    <Box
                      as={MdCheckCircle}
                      color="#FF6F61"
                      display="inline-block"
                      mr={2}
                    />
                    {feature}
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
