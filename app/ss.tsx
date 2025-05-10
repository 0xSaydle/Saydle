"use client";

import { Box, Text, SimpleGrid } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import PlanCard from "../components/custom/PlanCard";
import { useState } from "react";

const plans = [
  {
    name: "Monthly",
    price: "9.99",
    period: "month",
    features: [
      "Unlimited access to all features",
      "Personalized daily affirmations",
      "Progress tracking",
      "Community support",
      "Basic meditation guides",
    ],
    emoji: "🌟",
    description: "Perfect for those starting their journey",
  },
  {
    name: "Yearly",
    price: "99.99",
    period: "year",
    features: [
      "Everything in Monthly plan",
      "Advanced meditation guides",
      "Priority support",
      "Exclusive workshops",
      "Early access to new features",
    ],
    emoji: "✨",
    description: "Best value for committed users",
    popular: true,
  },
];

export default function Home() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const handlePlanSelect = (plan: string) => {
    setSelectedPlan(plan);
  };

  const handleSubscribe = (plan: string) => {
    // Store the selected plan in localStorage or state management
    localStorage.setItem("selectedPlan", plan);
    router.push("/dashboard/subscription");
  };

  return (
    <Box maxW="1200px" mx="auto" py={8} px={4}>
      <Text fontSize="2xl" fontWeight="bold" mb={6} textAlign="center">
        Choose Your Plan
      </Text>
      <Text fontSize="md" color="gray.600" mb={8} textAlign="center">
        Select the plan that best fits your needs
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} maxW="1000px" mx="auto">
        {plans.map((plan) => (
          <PlanCard
            key={plan.name}
            {...plan}
            isSelected={selectedPlan === plan.name}
            onClick={() => handlePlanSelect(plan.name)}
            onSubscribe={() => handleSubscribe(plan.name)}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
