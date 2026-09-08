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
      The Saydle app writes a new affirmation for you every morning:
      personal encouragement, a calm voice to read it aloud, and a home
      screen widget that keeps it close all day.
  </p>
    </Text>
  );
};
export default HeroSubText;
