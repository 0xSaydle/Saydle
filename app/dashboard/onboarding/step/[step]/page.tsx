import { Box, Flex, Text, Input, Button } from "@chakra-ui/react";

export default function OnboardingStep1() {
  return (
    <Flex flex={1} align="center" justify="center">
      <Box w="100%" maxW="500px" mt={12}>
        <Text mb={2} fontWeight="medium">
          What would you like us to call you?
        </Text>
        <Input placeholder="Alex" mb={8} defaultValue="Alex" />
        <Button
          w="full"
          borderRadius="24px"
          bgImage="linear-gradient(90deg, #FF6F61 0%, #A76D99 100%)"
          color="white"
          _hover={{
            bgImage: "linear-gradient(90deg, #A76D99 0%, #FF6F61 100%)",
            color: "white",
          }}
          fontWeight="bold"
          fontSize="16px"
          py={6}
        >
          Continue
        </Button>
      </Box>
    </Flex>
  );
}
