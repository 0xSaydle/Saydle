import { Box, Flex, Text, Input, Button } from "@chakra-ui/react";

export default function OnboardingPage() {
  return (
    <Flex
      minH="100vh"
      direction="column"
      bgGradient="radial(circle at 70% 60%, #fff 60%, #ffe7e5 100%)"
    >
      {/* Header */}
      <Box
        borderBottom="1px solid #eee"
        py={4}
        textAlign="center"
        fontWeight="bold"
        fontSize="24px"
      >
        Saydle
      </Box>
      <Flex flex={1}>
        {/* Sidebar */}
        <Box
          minW="300px"
          borderRight="1px solid #eee"
          py={8}
          px={8}
          bg="transparent"
        >
          <Text color="#FF6F61" fontWeight="bold" fontSize="20px" mb={2}>
            About You
          </Text>
          <Text fontWeight="bold" mb={1}>
            Personal Information
          </Text>
          <Text color="gray.600">Please tell us more about you</Text>
        </Box>
        {/* Main Content */}
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
      </Flex>
    </Flex>
  );
}
