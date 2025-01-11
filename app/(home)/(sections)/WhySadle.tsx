import { Flex, Box, Text } from "@chakra-ui/react";
import why_sadle from "../../../public/images/why_saydle-banner.png";
import Image from "next/image";
import { Poppins } from "../../fonts";
const WhySadleReasons = [
  {
    title: "Personalized Support: ",
    text: "Messages tailored to your life’s experiences and aspirations.",
  },
  {
    title: "Daily Encouragement: ",
    text: "Consistent affirmations to inspire positivity and resilience.",
  },
  {
    title: "A Wellness Partner: ",
    text: "We’re here for your journey, every step of the way.",
  },
];
const WhySadleReason = ({ title, text }: { title: string; text: string }) => {
  return (
    <Box
      borderRadius={"12px"}
      padding={"16px 20px"}
      bg={"white"}
      fontWeight={"500"}
      asChild
    >
      <div>
        <Text
          fontSize={"18px"}
          color={"dark.500"}
          asChild
        >
          <span>{title}</span>
        </Text>
        <Text
          color={"dark.300"}
          fontSize={"16px"}
          as="span"
        >
        {text}
        </Text>
      </div>
    </Box>
  );
};

const WhySadle = () => {
  return (
    <Flex py={"48px"} flexDirection={"column"} asChild>
      {/* Why Sadle */}
      <div>
        <Image src={why_sadle} alt="why_sadle" />
        <Text mt={"20px"} textAlign={"center"} textStyle={"h5"} asChild>
          <h2>
            Why
            <Text className={`${Poppins.className}`}
              fontWeight={"900"}
              asChild>
              <span> Saydle</span>
            </Text>
          </h2>
        </Text>
        <Flex flexDirection={"column"} gap={"10px"} asChild>
          <div>
            {WhySadleReasons.map((Reason, index) => (
              <WhySadleReason
                key={index}
                {...Reason}
              />
            ))}
          </div>
        </Flex>
      </div>
    </Flex>
  );
};
export default WhySadle;
