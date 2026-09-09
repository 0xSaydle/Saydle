import { Box, Flex, Text, Image as ChakraImage } from "@chakra-ui/react";
import Image, { StaticImageData } from "next/image";
import one from "@/public/images/unsplash_girl-book1.png";
import two from "@/public/images/girl_phone.png";
import three from "@/public/images/hand_phone.png";

const PANEL_HEIGHT = 188;
const FIGURE_HEIGHT = 250;

const HowItWorksItems = [
  {
    image: one,
    step: "01",
    title: "Share your story",
    text: "Tell us where you need support. We write affirmations that fit that life.",
    align: "18%",
  },
  {
    image: two,
    step: "02",
    title: "Listen, or read",
    text: "Read today’s line, or let a calm voice read the seven to you, one at a time.",
    align: "50%",
  },
  {
    image: three,
    step: "03",
    title: "Keep it close",
    text: "A widget on your home screen holds the line — even when you are offline.",
    align: "50%",
  },
];

const HowItWorksItem = ({
  image,
  step,
  title,
  text,
  align,
}: {
  image: StaticImageData;
  step: string;
  title: string;
  text: string;
  align: string;
}) => {
  return (
    <Box
      layerStyle={"surface.card"}
      pt={"88px"}
      px={"28px"}
      pb={"36px"}
      minW={{ md: "220px", lg: "280px" }}
      maxW={{ base: "100%", md: "33%" }}
      flex={{ md: 1 }}
    >
      <Box
        bgGradient="brandSoft"
        height={`${PANEL_HEIGHT}px`}
        borderRadius={"media"}
        position={"relative"}
      >
        <ChakraImage
          position={"absolute"}
          bottom={0}
          left={align}
          transform={align === "50%" ? "translateX(-50%)" : undefined}
          h={`${FIGURE_HEIGHT}px`}
          w={"auto"}
          objectFit={"contain"}
          asChild
        >
          <Image src={image} alt="" />
        </ChakraImage>
      </Box>
      <Text
        pt={"24px"}
        textStyle={"caption"}
        color={"secondary.20"}
        letterSpacing={"0.14em"}
        fontWeight={700}
      >
        {step}
      </Text>
      <Text color={"dark.500"} textStyle={"h6"} pt={"6px"} asChild>
        <h3>{title}</h3>
      </Text>
      <Text color={"dark.300"} textStyle={"body_lg"} pt={"8px"} maxW={"32ch"}>
        {text}
      </Text>
    </Box>
  );
};

const HowItWorks = () => {
  return (
    <Box id="how-it-works" pt={{ base: "80px", md: "140px" }}>
      <Text textAlign={"center"} textStyle={{ base: "h4", md: "h2" }} asChild>
        <h2>How it works</h2>
      </Text>
      <Text
        textAlign={"center"}
        textStyle={"body_lg"}
        color={"dark.300"}
        maxW={"42ch"}
        mx={"auto"}
        pt={"12px"}
      >
        Three quiet steps. No account on the web — this lives on your phone.
      </Text>
      <Flex
        direction={{ base: "column", md: "row" }}
        wrap={"wrap"}
        align={{ md: "stretch" }}
        justify={"center"}
        columnGap={{ md: "24px" }}
        rowGap={"32px"}
        pt={"40px"}
      >
        {HowItWorksItems.map((item) => (
          <HowItWorksItem key={item.step} {...item} />
        ))}
      </Flex>
    </Box>
  );
};

export default HowItWorks;
