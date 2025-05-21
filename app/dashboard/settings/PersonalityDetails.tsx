import { Box, Heading, Text } from "@chakra-ui/react";

export default function PersonalityDetails() {
  return (
    <Box bg="gray.50" p={6} rounded="lg" shadow="md">
      <Heading as="h2" size="md" mb={4}>
        Personality Details
      </Heading>
      <Text>
        <Text as="span" fontWeight="semibold">Type:</Text> INTP-T
      </Text>
      <Text>
        <Text as="span" fontWeight="semibold">Strengths:</Text> Logical, Analytical, Creative
      </Text>
      <Text>
        <Text as="span" fontWeight="semibold">Weaknesses:</Text> Overthinking, Perfectionist
      </Text>
    </Box>
  );
}
