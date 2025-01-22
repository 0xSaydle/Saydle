import { Flex, Box, Text, Icon } from "@chakra-ui/react";
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
        <Text fontSize={"18px"} color={"dark.500"} asChild>
          <span>{title}</span>
        </Text>
        <Text color={"dark.300"} fontSize={"16px"} as="span">
          {text}
        </Text>
      </div>
    </Box>
  );
};

const WhySadle = () => {
  return (
    <Flex
      py={"48px"}
      flexDirection={{ base: "column", sm: "column", md: "row" }}
      align={{md:"center"}}
      gap={{md:"20px"}}
      asChild
    >
      {/* Why Sadle */}
      <div>
        <Icon
          height={{ base: "100%", md: "auto" }}
          width={{ base: "100%", md: "45%" }}
          asChild
        >
          <Image src={why_sadle} alt="why_sadle" />
        </Icon>
        <Flex flexDirection={{ base: "column" }} gap={"25px"} asChild>
          <div>
            <Text
              mt={"20px"}
              textAlign={{ base: "center", md: "left" }}
              textStyle={{base:"h5", md:"h3"}}
              pl={{ base: "0px", sm: "20px" }}
              asChild
            >
              <h2>
                Why
                <Text
                  className={`${Poppins.className}`}
                  fontWeight={"900"}
                  asChild
                >
                  <span> Saydle</span>
                </Text>?
              </h2>
            </Text>
            <Flex flexDirection={"column"} gap={"10px"} asChild>
              <div>
                {WhySadleReasons.map((Reason, index) => (
                  <WhySadleReason key={index} {...Reason} />
                ))}
              </div>
            </Flex>
          </div>
        </Flex>
      </div>
    </Flex>
  );
};
export default WhySadle;
