import { Box, Text, SimpleGrid } from "@chakra-ui/react";

import PlanCard from "@/components/custom/PlanCard";
import plans from "@/lib/plans";
import { SubscribeBtn } from "@/components/custom/SubscribeBtn";

export default function OnboardingStep5() {
  return (
    <Box maxW="1200px" mx="auto" py={8} px={4}>
      <Text fontSize="2xl" fontWeight="bold" mb={6} textAlign="center">
        Choose Your Plan
      </Text>
      <Text fontSize="md" color="gray.600" mb={8} textAlign="center">
        Select the plan that best fits your needs
      </Text>

      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        gap={6}
        maxW="1000px"
        mx="auto"
        placeItems="center"
        justifyItems="center"
      >
        {plans.map((plan) => (
          <PlanCard
            Button={
              <SubscribeBtn
                title={plan.title}
                productId={plan.productId}
              ></SubscribeBtn>
            }
            key={plan.title}
            {...plan}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
