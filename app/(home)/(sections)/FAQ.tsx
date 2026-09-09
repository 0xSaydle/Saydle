import { Box, Text, Flex } from "@chakra-ui/react";
import Link from "next/link";

const FaqData = [

  {
    Q: "How are the affirmations personalized?",
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
  <Box layerStyle={"surface.panel"} p={"20px 24px"} asChild>
    <div>
      <Text textStyle={"title"} color={"dark.500"}>
        {Q}
      </Text>
      <Text textStyle={"body_lg"} color={"dark.300"} pt={"6px"}>
        {A}
      </Text>
    </div>
  </Box>
);
const FAQ = () => {
  return (
    <Flex
      mt={{ base: "80px", md: "140px" }}
      mb={{ base: "64px", md: "88px" }}
      flexDirection={{ base: "column", md: "row" }}
      gap={"6%"}
      bgGradient={"brand"}
      p={{ base: "28px 20px", sm: "48px", md: "64px" }}
      borderRadius={"pill"}
      asChild
      >
      <div>
        <Flex flexDirection={{ base: "column" }} height={"inherit"} asChild
      justifyContent={"space-between"}
        >
          <div>
            <div>
              <Text
                textStyle={"chip"}
                color={"whiteAlpha.800"}
                textTransform={"uppercase"}
                letterSpacing={"0.14em"}
              >
                FAQ
              </Text>
              <Text
                textStyle={{ base: "h5", md: "h4" }}
                color={"white"}
                mt={"12px"}
                maxW={"18ch"}
                asChild
              >
                <h2>Discover the most common questions.</h2>
              </Text>
              <Text
                textStyle={"body_lg"}
                color={"whiteAlpha.900"}
                mt={"12px"}
                maxW={"44ch"}
              >
                Find answers to the questions we’re asked the most and learn how
                Saydle can support your journey toward positivity and wellness.
              </Text>
            </div>
            {/* The full FAQ page is parked with the web app.
            <Link href="/faq">Check all common questions</Link> */}
            <Box
              layerStyle={"pill.outline"}
              borderColor={"whiteAlpha.700"}
              color={"white"}
              mt={"32px"}
              _hover={{ bg: "whiteAlpha.200", borderColor: "white" }}
              asChild
            >
              <Link href="mailto:support@saydle.com">Ask us anything</Link>
            </Box>
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
