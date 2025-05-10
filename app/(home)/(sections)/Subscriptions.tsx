import { Flex, Text, Box, Icon } from "@chakra-ui/react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import wave from "@/public/icons/wave.svg";
import arm from "@/public/icons/arm.svg";
import rocket from "@/public/icons/rocket.svg";
import PlanCard from "@/components/custom/PlanCard";

const SubscriptionPlanDetails = [
  {
    title: "Monthly",
    price: "9.99",
    period: "month",
    features: [
      "Unlimited access to all features",
      "Personalized daily affirmations",
      "Progress tracking",
      "Community support",
      "Basic meditation guides",
    ],
    icon: " 👋🏽",
    description: "Perfect for those starting their journey",
  },
  {
    title: "Yearly",
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
    icon: "💪🏽",
    description: "Best value for committed users",
    special: "on",
  },
];

const Subscriptions = () => {
  return (
    <Box py={"48px"} asChild>
      <div>
        <Text
          textAlign={"center"}
          textStyle={{ base: "h5", sm: "h3" }}
          mb={"10px"}
        >
          Our Subscription Plans
        </Text>
        <Text
          color={"dark.300"}
          textAlign={"center"}
          textStyle={"body_lg"}
          mb={"10px"}
        >
          Choose a plan that suits your journey and start receiving personalized
          affirmations every day
        </Text>
      

        <Flex
          gap={"10px"}
          flexDirection={{ base: "column", md: "row" }}
          flexWrap={"wrap"}
          position={"relative"}
          justifyContent={"center"}
          my={"100px"}
          asChild
        >
          <div>
          
            {SubscriptionPlanDetails.map((plan, index) => (
              <PlanCard key={index} {...plan} />
            ))}
          </div>
        </Flex>
      </div>
    </Box>
  );
};

export default Subscriptions;
