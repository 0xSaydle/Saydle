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
const AppleMark = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M16.7 12.6c.03 3.2 2.8 4.26 2.83 4.28-.02.07-.44 1.51-1.46 3-.88 1.28-1.8 2.56-3.24 2.59-1.42.02-1.88-.84-3.51-.84-1.62 0-2.13.82-3.47.87-1.39.05-2.45-1.39-3.35-2.67-1.83-2.6-3.23-7.35-1.35-10.56.93-1.6 2.6-2.61 4.41-2.64 1.38-.03 2.68.93 3.51.93.84 0 2.41-1.15 4.07-.98.69.03 2.64.28 3.89 2.11-.1.06-2.32 1.36-2.33 4.01ZM14.6 5.3c.75-.9 1.25-2.16 1.11-3.41-1.08.04-2.38.72-3.15 1.62-.7.8-1.31 2.09-1.15 3.32 1.21.09 2.45-.62 3.19-1.53Z" />
  </svg>
);

const PlayMark = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
    <path fill="currentColor" d="M3.6 2.8c-.4.2-.6.6-.6 1.1v16.2c0 .5.2.9.6 1.1l.1.1 9.3-9.3v-.1L3.7 2.7l-.1.1Z" />
    <path fill="currentColor" d="m13.1 12.2 2.2-2.2-8.6-5 6.4 7.2Z" opacity=".85" />
    <path fill="currentColor" d="m13.1 11.8 6.4 3.7c.5.3.8.4.8-.2 0-.2-.1-.4-.3-.5l-6.9-4Z" opacity=".7" />
    <path fill="currentColor" d="m15.3 14 2.2-2.2-6.4-3.7 4.2 5.9Z" opacity=".55" />
  </svg>
);

const stores = [
  { name: "App Store", note: "Coming soon", mark: <AppleMark /> },
  { name: "Google Play", note: "Coming soon", mark: <PlayMark /> },
];

const GetTheApp = () => {
  return (
    <Box
      id="get-the-app"
      mt={{ base: "80px", md: "140px" }}
      layerStyle={"surface.dark"}
      p={{ base: "48px 24px", md: "88px 72px" }}
      textAlign={"center"}
    >
      <Text textStyle={{ base: "h4", md: "h3" }} color={"white"} asChild>
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

      <Flex justifyContent={"center"} gap={"12px"} pt={"32px"} flexWrap={"wrap"}>
        {stores.map((store) => (
          <Flex
            key={store.name}
            align={"center"}
            gap={"12px"}
            border={"1px solid"}
            borderColor={"whiteAlpha.400"}
            borderRadius={"card"}
            px={"20px"}
            py={"14px"}
            color={"white"}
            minW={"200px"}
          >
            {store.mark}
            <Box textAlign={"left"}>
              <Text textStyle={"caption"} color={"light.700"}>
                {store.note}
              </Text>
              <Text textStyle={"title"} color={"white"}>
                {store.name}
              </Text>
            </Box>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default GetTheApp;
