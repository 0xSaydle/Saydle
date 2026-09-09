import { Box, Text } from "@chakra-ui/react";

const HeadlinerText = () => {
  return (
    <Text hideFrom={"md"} textStyle={"h4"} pt={"20px"} asChild>
      <h1>
        Embrace each day with{" "}
        <Box layerStyle="highlight.phrase" as="span">
          uplifting affirmations
        </Box>
      </h1>
    </Text>
  );
};

export default HeadlinerText;
