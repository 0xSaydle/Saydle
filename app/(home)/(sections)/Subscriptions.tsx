import { Flex, Text, Box } from "@chakra-ui/react";
import PlanCard from "@/components/custom/PlanCard";
import plans from "@/app/lib/plans";

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
          
            {plans.map((plan, index) => (
              <PlanCard key={index} {...plan} />
            ))}
          </div>
        </Flex>
      </div>
    </Box>
  );
};

export default Subscriptions;
