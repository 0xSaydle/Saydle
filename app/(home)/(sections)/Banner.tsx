import type { ReactNode } from "react";
import { Box, Flex, Grid, Heading, Text, Icon } from "@chakra-ui/react";
import Tag from "@/components/custom/Tag";
import Link from "next/link";
import Image from "next/image";

const introTags = [
  { icon: "/icons/vuesax/pink.svg", text: "Positivity" },
  { icon: "/icons/vuesax/purple.svg", text: "Wellness" },
];

const mainPhotoTags = [
  {
    icon: "/icons/vuesax/green.svg",
    text: "Find strength, and embrace each day",
  },
  { icon: "/icons/vuesax/orange.svg", text: "Empowerment" },
];

const sidePhotoTags = [
  { icon: "/icons/vuesax/blue.svg", text: "Hope" },
  { icon: "/icons/vuesax/green.svg", text: "Support" },
];

const HERO_MAIN = "/images/hero_main.jpg";
const HERO_SIDE = "/images/hero_side.jpg";

const Dots = () => (
  <Flex gap="8px" aria-hidden>
    <Box w="9px" h="9px" borderRadius="full" bg="white" />
    <Box w="9px" h="9px" borderRadius="full" bg="whiteAlpha.500" />
    <Box w="9px" h="9px" borderRadius="full" bg="whiteAlpha.500" />
  </Flex>
);

const ArrowOut = () => (
  <svg width="44" height="44" viewBox="0 0 52 52" fill="none" aria-hidden>
    <path
      d="M26 4.33333C14.04 4.33333 4.33337 14.04 4.33337 26C4.33337 37.96 14.04 47.6667 26 47.6667C37.96 47.6667 47.6667 37.96 47.6667 26"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M28.1666 23.8333L45.9333 6.06667"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M47.6667 14.7983V4.33333H37.2017"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const HeadlineCards = () => (
  <Box position="relative" w="max-content" maxW="100%">
    <Box
      layerStyle="surface.card"
      position="relative"
      zIndex={1}
      px={{ base: "18px", md: "28px", lg: "32px" }}
      py={{ base: "12px", md: "18px", lg: "20px" }}
    >
      <Heading
        as="h1"
        fontSize={{ base: "22px", md: "clamp(28px, 3.2vw, 42px)" }}
        fontWeight={600}
        lineHeight={1.1}
        letterSpacing="-0.022em"
        textTransform="uppercase"
      >
        Embrace each day with
      </Heading>
    </Box>
    <Box
      layerStyle="surface.card"
      position="relative"
      zIndex={2}
      mt={{ base: "-14px", md: "-18px" }}
      ml={{ base: "18px", md: "36px", lg: "44px" }}
      p={{ base: "6px", md: "8px" }}
    >
      <Heading
        as="p"
        fontSize={{ base: "22px", md: "clamp(28px, 3.2vw, 42px)" }}
        fontWeight={600}
        lineHeight={1.1}
        letterSpacing="-0.022em"
        textTransform="uppercase"
        border="1.5px solid"
        borderColor="primary.20"
        borderRadius="pill"
        px={{ base: "14px", md: "22px", lg: "26px" }}
        py={{ base: "10px", md: "14px", lg: "16px" }}
      >
        Uplifting affirmations
      </Heading>
    </Box>
  </Box>
);

const Actions = () => (
  <Flex gap="14px" align="center" flexWrap="wrap">
    <Box
      layerStyle="pill.solid"
      px={{ base: "24px", md: "28px" }}
      py={{ base: "14px", md: "16px" }}
      fontSize={{ base: "16px", md: "18px" }}
      asChild
    >
      <Link href="/#get-the-app">Get the app</Link>
    </Box>
    <Box
      layerStyle="pill.outline"
      px={{ base: "24px", md: "28px" }}
      py={{ base: "14px", md: "16px" }}
      fontSize={{ base: "16px", md: "18px" }}
      asChild
    >
      <Link href="/#how-it-works">
        Learn more
        <Icon fontSize={{ base: "20px", md: "22px" }} asChild>
          <Image src="/icons/receive-square.svg" width={22} height={22} alt="" />
        </Icon>
      </Link>
    </Box>
  </Flex>
);

const PhotoFrame = ({
  src,
  alt,
  children,
  borderRadius = "section",
  objectPosition = "center 20%",
  priority = false,
}: {
  src: string;
  alt: string;
  children?: ReactNode;
  borderRadius?: string;
  objectPosition?: string;
  /** Set on the hero, which is the LCP element. Leave off below the fold. */
  priority?: boolean;
}) => (
  <Box
    layerStyle="surface.media"
    borderRadius={borderRadius}
    position="relative"
    overflow="hidden"
    h="100%"
    minH={0}
  >
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      priority={priority}
      style={{ objectFit: "cover", objectPosition }}
    />
    {children}
  </Box>
);

const Banner = () => {
  return (
    <>
      <Box display={{ base: "block", md: "none" }} pt="20px">
        <Flex gap="10px" pb="18px" flexWrap="wrap">
          {introTags.map((tag) => (
            <Tag key={tag.text} icon={tag.icon} text={tag.text} size="lg" />
          ))}
        </Flex>
        <HeadlineCards />
        <Box h="340px" mt="18px">
          <PhotoFrame src={HERO_MAIN} alt="Person smiling with calm confidence" priority>
            <Box
              position="absolute"
              top="14px"
              right="14px"
              layerStyle="glass.base"
              px="14px"
              py="10px"
              fontSize="14px"
              fontWeight={600}
              lineHeight={1.4}
              maxW="75%"
            >
              Transform your mindset with affirmations that matter
            </Box>
            <Flex
              position="absolute"
              bottom="14px"
              left="14px"
              right="14px"
              gap="8px"
              wrap="wrap"
            >
              {mainPhotoTags.map((tag) => (
                <Tag
                  key={tag.text}
                  icon={tag.icon}
                  text={tag.text}
                  onImage
                  size="lg"
                />
              ))}
            </Flex>
          </PhotoFrame>
        </Box>
        <Text
          color="dark.300"
          fontSize="17px"
          fontWeight={500}
          lineHeight={1.6}
          pt="24px"
        >
          Discover the power of daily affirmations crafted uniquely for you —
          personal encouragement to help you navigate life’s challenges.
        </Text>
        <Box pt="24px">
          <Actions />
        </Box>
      </Box>

      <Grid
        display={{ base: "none", md: "grid" }}
        flex="1"
        minH={0}
        pt="16px"
        pb="20px"
        columnGap={{ md: "24px", lg: "32px" }}
        rowGap={{ md: "24px", lg: "28px" }}
        templateColumns={{
          md: "minmax(280px, 0.95fr) minmax(0, 1.5fr)",
          lg: "minmax(280px, 0.9fr) minmax(0, 1.5fr) minmax(260px, 0.85fr)",
        }}
        templateRows="auto auto minmax(0, 1fr)"
        templateAreas={{
          md: `
            "tags photo"
            "heads photo"
            "cta photo"
          `,
          lg: `
            "tags photo aside-top"
            "heads photo aside-media"
            "cta photo aside-media"
          `,
        }}
      >
        <Flex gridArea="tags" gap="10px" flexWrap="wrap" alignSelf="start">
          {introTags.map((tag) => (
            <Tag key={tag.text} icon={tag.icon} text={tag.text} size="lg" />
          ))}
        </Flex>

        <Box
          gridColumn="1 / 3"
          gridRow="2"
          zIndex={5}
          alignSelf="center"
          w="max-content"
          maxW="94%"
          ml={{ md: "4%", lg: "8%" }}
        >
          <HeadlineCards />
        </Box>

        <Box gridArea="cta" alignSelf="end" maxW="40ch" pb="4px">
          <Text
            color="dark.300"
            fontSize={{ md: "18px", lg: "20px" }}
            fontWeight={500}
            lineHeight={1.55}
          >
            Discover the power of daily affirmations crafted uniquely for you —
            personal encouragement to help you navigate life’s challenges.
          </Text>
          <Box pt="24px">
            <Actions />
          </Box>
        </Box>

        <Box
          gridArea="photo"
          gridRow="1 / -1"
          minH={{ md: "480px", lg: "0" }}
          h="100%"
          position="relative"
          zIndex={1}
        >
          <PhotoFrame src={HERO_MAIN} alt="Person smiling with calm confidence" priority>
            <Box
              position="absolute"
              top={{ md: "20px", lg: "24px" }}
              right={{ md: "20px", lg: "24px" }}
              layerStyle="glass.base"
              px={{ md: "18px", lg: "22px" }}
              py={{ md: "14px", lg: "16px" }}
              fontSize={{ md: "16px", lg: "18px" }}
              fontWeight={600}
              lineHeight={1.4}
              maxW="56%"
            >
              Transform your mindset with affirmations that matter
            </Box>
            <Flex
              position="absolute"
              bottom={{ md: "20px", lg: "24px" }}
              left={{ md: "20px", lg: "24px" }}
              right={{ md: "20px", lg: "24px" }}
              justify="space-between"
              align="flex-end"
              gap="10px"
            >
              <Flex gap="8px" wrap="wrap">
                {mainPhotoTags.map((tag) => (
                  <Tag
                    key={tag.text}
                    icon={tag.icon}
                    text={tag.text}
                    onImage
                    size="lg"
                  />
                ))}
              </Flex>
              <Dots />
            </Flex>
          </PhotoFrame>
        </Box>

        <Box
          display={{ base: "none", lg: "block" }}
          gridArea="aside-top"
          alignSelf="start"
        >
          <Flex justify="space-between" align="flex-start" gap="12px">
            <Text
              fontSize="24px"
              fontWeight={600}
              lineHeight={1.25}
              letterSpacing="-0.014em"
              color="dark.500"
            >
              Affirmations &amp; Personalization
            </Text>
            <Box color="dark.300" flexShrink={0}>
              <ArrowOut />
            </Box>
          </Flex>
          <Text
            fontSize="18px"
            fontWeight={500}
            lineHeight={1.55}
            color="dark.300"
            pt="12px"
          >
            Small words, big impact — crafted for your unique challenges.
          </Text>
        </Box>

        <Box
          display={{ base: "none", lg: "block" }}
          gridArea="aside-media"
          alignSelf="end"
          w="100%"
          aspectRatio="3 / 4"
          maxH="360px"
        >
          <PhotoFrame
            src={HERO_SIDE}
            alt="Person smiling in a casual portrait"
            borderRadius="card"
            objectPosition="center 15%"
          >
            <Text
              layerStyle="glass.strong"
              position="absolute"
              top="16px"
              right="16px"
              px="16px"
              py="12px"
              fontSize="16px"
              fontWeight={600}
              lineHeight={1.4}
              maxW="80%"
            >
              Your daily dose of positivity, tailored just for you!
            </Text>
            <Flex
              position="absolute"
              bottom="16px"
              left="16px"
              right="16px"
              justify="space-between"
              align="flex-end"
              gap="8px"
            >
              <Flex gap="8px" wrap="wrap">
                {sidePhotoTags.map((tag) => (
                  <Tag
                    key={tag.text}
                    icon={tag.icon}
                    text={tag.text}
                    onImage
                    size="lg"
                  />
                ))}
              </Flex>
              <Dots />
            </Flex>
          </PhotoFrame>
        </Box>
      </Grid>
    </>
  );
};

export default Banner;
