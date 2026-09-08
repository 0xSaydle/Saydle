"use client";
import { Box, Container, Heading, Text, Accordion } from "@chakra-ui/react";

const faqData = [
  {
    question: "How are the affirmations personalized?",
    answer:
      "During the sign-up process, you&apos;ll share areas where you&apos;d like support. Using this information, we craft affirmations that resonate with your specific needs and goals.",
  },
  {
    question: "Is my personal information safe?",
    answer:
      "Absolutely. Your privacy is our top priority. We use advanced encryption and strict privacy measures to ensure your data remains confidential.",
  },
  {
    question: "Are there any free trials?",
    answer:
      "We do not offer a free trial to ensure we allocate resources to providing you the best personalized experience from day one.",
  },
];

export default function FAQPage() {
  return (
    <Container maxW="container.xl" py={16}>
      <Box textAlign="center" mb={12}>
        <Heading as="h1" size="2xl" mb={4} color="light.400" fontWeight="bold">
          FAQ
        </Heading>
        <Text fontSize="xl" color="light.400" maxW="2xl" mx="auto">
          Discover the most common questions. Find answers to the questions
          we&apos;re asked the most and learn how Saydle can support your
          journey toward positivity and wellness.
        </Text>
      </Box>

      <Accordion.Root maxW="3xl" mx="auto">
        {faqData.map((faq, index) => (
          <Accordion.Item
            key={index}
            value={`item-${index}`}
            border="1px solid"
            borderColor="dark.100"
            borderRadius="lg"
            mb={4}
          >
            <Accordion.ItemTrigger
              py={4}
              _hover={{ bg: "dark.100" }}
              color="light.400"
            >
              <Box flex="1" textAlign="left" fontWeight="medium">
                {faq.question}
              </Box>
              <Accordion.ItemIndicator color="light.400" />
            </Accordion.ItemTrigger>
            <Accordion.ItemContent>
              <Accordion.ItemBody pb={4} color="light.400">
                {faq.answer}
              </Accordion.ItemBody>
            </Accordion.ItemContent>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </Container>
  );
}
