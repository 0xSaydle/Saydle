import { Box, Flex, Text } from "@chakra-ui/react";

/**
 * The section the whole page points at. Saydle ships as a mobile app, and this
 * is the one honest thing a landing page can say before launch day: it is
 * coming, and here is where it will be.
 *
 * The store badges become real links the day the listings exist. Until then
 * they are plainly labelled as coming soon, because a badge that links nowhere
 * reads as broken and a fake link is worse.
 */
const stores = [
  { name: "App Store", note: "Coming soon" },
  { name: "Google Play", note: "Coming soon" },
];

const GetTheApp = () => {
  return (
    <Box
      id="get-the-app"
      mt={{ base: "64px", md: "96px" }}
      bg={"secondary.900"}
      borderRadius={"32px"}
      p={{ base: "32px 24px", md: "64px" }}
      textAlign={"center"}
    >
      <Text textStyle={"h4"} color={"light.100"} asChild>
        <h2>Saydle is coming to your phone</h2>
      </Text>
      <Text
        textStyle={"body_lg"}
        color={"light.700"}
        maxW={"560px"}
        mx={"auto"}
        pt={"16px"}
      >
        One new affirmation every morning, written for where you are. A calm
        voice to read today&apos;s seven aloud. A widget that keeps your line
        on the home screen, even offline.
      </Text>

      <Flex
        justifyContent={"center"}
        gap={"16px"}
        pt={"32px"}
        flexWrap={"wrap"}
      >
        {stores.map((store) => (
          <Box
            key={store.name}
            border={"1px solid"}
            borderColor={"light.700"}
            borderRadius={"16px"}
            p={"12px 28px"}
            textAlign={"left"}
          >
            <Text textStyle={"body_sm"} color={"light.700"}>
              {store.note}
            </Text>
            <Text textStyle={"title"} color={"light.100"} fontWeight={700}>
              {store.name}
            </Text>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default GetTheApp;
