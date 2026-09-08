import { Box, Text, Flex } from "@chakra-ui/react";
import Link from "next/link";

const FaqData = [

  {
    Q: " How are the affirmations personalized?",
    A: "During the sign-up process, you’ll share areas where you’d like support. Using this information, we craft affirmations that resonate with your specific needs and goals.",
  },
  {
    Q: "Is my personal information safe?",
    A: "Absolutely. Your privacy is our top priority. We use advanced encryption and strict privacy measures to ensure your data remains confidential.",
  },
  {
    Q: "Are there any free trials?",
    A: "We do not offer a free trial to ensure we allocate resources to providing you the best personalized experience from day one.",
  },
];
const Faq = ({ Q, A }: { Q: string; A: string }) => (
  <Box  backgroundColor={"white"} borderRadius={"20px"} p={"16px 20px"} asChild>
    <div>
      <Text textStyle={"title"} color={"dark.20"}>
        {Q}
      </Text>
      <Text textStyle={"body_sm"} color={"dark.300"}>
        {A}
      </Text>
    </div>
  </Box>
);
const FAQ = () => {
  return (
    <Flex
      my={"60px"}
      flexDirection={{ base: "column", md: "row" }}
      gap={"6%"}
      background={
        "linear-gradient(102deg, #A76D99 40.11%, #FF6F61 109.93%), #FFF;"
      }
      p={{ base: "20px", sm: "40px" }}
      borderRadius={"24px"}
      asChild
      >
      <div>
        <Flex flexDirection={{ base: "column" }} height={"inherit"} asChild
      justifyContent={"space-between"}
        >
          <div>
            <div>
            <Text textStyle={"caption"} color={"light.600"} mt={"20px"}>
          FAQ
        </Text>
        <Text textStyle={"h5"} color={"light.400"} mt={"20px"}>
          Discover the most common questions.
        </Text>
        <Text textStyle={"body_lg"} color={"light.500"} mt={"10px"}>
          Find answers to the questions we’re asked the most and learn how
          Saydle can support your journey toward positivity and wellness.
        </Text>
     </div>
        <Text
          textStyle={"body_lg"}
          color={"light.500"}
          asChild
          borderBottom={"1px solid"}
          my={"20px"}
          p={"4px 8px"}
              width={"max-content"}
        >
          <Link href="/faq">Check all common questions</Link>
        </Text>

          </div>
    </Flex>
        <Flex flexDirection={"column"} gap={"20px"} py={"20px"}  asChild>
          <div>
            {FaqData.map((faq, index) => (
              <Faq key={index} {...faq} />
            ))}
          </div>
        </Flex>
      </div>
    </Flex>
  );
};

export default FAQ;
