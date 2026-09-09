import { Text } from "@chakra-ui/react";

const HeroSubText = () => {
  return (
    <Text hideFrom={"md"}
      textStyle={"body_sm"}
      color={"dark.300"}
      py={"16px"}
      asChild
    >
      <p>
      A new affirmation every morning, written for where you are. A calm
      voice to read it aloud. A widget that keeps it close all day.
  </p>
    </Text>
  );
};
export default HeroSubText;
