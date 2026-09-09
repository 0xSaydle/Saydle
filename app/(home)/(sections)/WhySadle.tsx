import { Flex, Box, Text } from "@chakra-ui/react";
import why_sadle from "@/public/images/why_saydle-banner.png";
import Image from "next/image";
import { Poppins } from "../../fonts";

const WhySadleReasons = [
  {
    title: "Personalized Support",
    text: "Messages tailored to your life’s experiences and aspirations.",
  },
  {
    title: "Daily Encouragement",
    text: "Consistent affirmations to inspire positivity and resilience.",
  },
  {
    title: "A Wellness Partner",
    text: "We’re here for your journey, every step of the way.",
  },
];

const WhySadleReason = ({ title, text }: { title: string; text: string }) => {
  return (
    <Box layerStyle={"surface.panel"} boxShadow={"xs"} padding={"22px 26px"}>
      <Text textStyle={"title"} color={"dark.500"}>
        {title}
      </Text>
      <Text color={"dark.300"} textStyle={"body_lg"} pt={"4px"}>
        {text}
      </Text>
    </Box>
  );
};

const WhySadle = () => {
  return (
    <Flex
      pt={{ base: "72px", md: "128px" }}
      direction={{ base: "column", md: "row" }}
      align={{ md: "center" }}
      gap={{ base: "32px", md: "64px" }}
    >
      <Box
        flex={{ md: "0 0 46%" }}
        borderRadius={"section"}
        overflow={"hidden"}
        boxShadow={"float"}
      >
        <Image
          src={why_sadle}
          alt="A woman holding a slice of orange over one eye"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </Box>
      <Flex direction={"column"} gap={"20px"} flex={1}>
        <Text
          textAlign={{ base: "center", md: "left" }}
          textStyle={{ base: "h4", md: "h2" }}
          asChild
        >
          <h2>
            Why
            <Text className={`${Poppins.className}`} fontWeight={"900"} asChild>
              <span> Saydle</span>
            </Text>
            ?
          </h2>
        </Text>
        <Flex direction={"column"} gap={"16px"}>
          {WhySadleReasons.map((reason) => (
            <WhySadleReason key={reason.title} {...reason} />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};
export default WhySadle;
