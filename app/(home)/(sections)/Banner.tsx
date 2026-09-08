import {
  Box, Flex,
  Heading,
  Text,
  Icon
} from "@chakra-ui/react";
import Tag from "@/components/custom/Tag";
import Button from "@/components/custom/button";
import Link from "next/link";
import Image from "next/image";
// import icons from "@/public/icons/receive-square.svg";

// import LearnMore from "@/components/custom/LearnMore";
const tagData = [
  { icon: "/icons/vuesax/pink.svg", text: "Positivity" },
  { icon: "/icons/vuesax/purple.svg", text: "Wellness" },
];

const bottomTags = [
  {
    icon: "/icons/vuesax/green.svg",
    text: "Find strength, and ambition each day",
  },
  { icon: "/icons/vuesax/orange.svg", text: "Empowerment" },
];

const rightTags = [
  { icon: "/icons/vuesax/blue.svg", text: "Hope" },
  { icon: "/icons/vuesax/green.svg", text: "Support" },
];

const Banner = () => {
  return (
    <Box hideBelow={"md"} justifyContent={"center"} >
      <Flex
        direction={{ base: "column", md: "row" }}
        alignItems="flex-end"
        gap={2} 
      >
        {/* Left Section */}
        <Box flex="1" position={"relative"}  >
          <Flex gap={2} mb={"180px"}>
            {tagData.map((tag, idx) => (
              <Tag key={idx} icon={tag.icon} text={tag.text} />
            ))}
          </Flex>
          <Box
            bg="#fff"
            borderRadius="24px"
            boxShadow="0 4px 24px rgba(0,0,0,0.04)"
            p={{ base: 4, md: 6 }}
            mb={4}
            mr={"-50px"} position={"relative"}
            zIndex={"99"} ml={"auto"}
            pos={"absolute"}
            w={"max-content"}
            top={"45px"}
          >
            <Heading
              as="h1"
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="bold"
              mb={2}
            >
              EMBRACE EACH DAY WITH
            </Heading>
          </Box>
          <Box
            bg="#fff"
            borderRadius="24px"
            boxShadow="0 4px 24px rgba(0,0,0,0.04)"
            p={{ base: 4, md: 5 }}
            mb={4}
            mr={"-50px"} position={"relative"}
            zIndex={"99"} ml={"auto"}
            pos={"absolute"}
            w={"max-content"}
            top={"95px"}
          >
            <Heading
              as="h2"
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="bold"
              border={"1px solid"}
              borderColor="#FF6B6B"
              pb={2}
              w={"max-content"}
              padding={"12px"}
              borderRadius={"25px"}
            >
              UPLIFTING AFFIRMATIONS
            </Heading>
          </Box>
          <Text color="gray.600" mb={6}>
            Discover the power of daily affirmations crafted uniquely for
            you—providing personalized encouragement to help you navigate
            life&apos;s challenges.
          </Text>
          <Flex
            gap={"10px"}
            alignItems={"center"}
            borderRadius={"24px"}
            pt={"24px"}
          >
              <Button bg={"primary.20"} text="Subscribe" path="/login" />
              <Box
    p={"12px 24px"}
    borderRadius={"24px"}
    border={"1px solid"}
    borderColor={"secondary.20"}
    display={"flex"}
    gap={"10px"}
    textStyle={"button_lg"}
    alignItems={"center"}
    asChild
  >
    <Link href={"/about"}>
      Learn more
      <Icon fontSize={"24px"} asChild>
                  <Image src={"icons/receive-square.svg"} width={24} height={24} alt="icon"/>
        {/* <Image src={icons} alt="icon"/> */}
      </Icon>
    </Link>
  </Box>
          </Flex>
        </Box>
        {/* Center Section (Girl Image) */}
        <Box flex="1" w={"400px"} position="relative">
          <Box
            borderRadius="32px"
            overflow="hidden"
            boxShadow="0 4px 24px rgba(0,0,0,0.08)"
            position="relative"
            bg="#e6e6e6"
            height="505.34px"
            minW="350.5px"
            maxW="400px"
            flexShrink={0}
            background="url('/images/unsplash_girl.png') #E6E6E6 bottom right / 90% no-repeat"
            >
            <Box
              position="absolute"
              top={4}
              right={4}
              px={3}
              py={2}
              borderRadius="16px"
              fontSize="sm"
              fontWeight="medium"
              bg="whiteAlpha.200"
              backdropFilter="blur(18px)"
              color={"#f4f4f5"}
              width="50%"
            >
              Transform your mindset with affirmations that matter
            </Box>
            <Flex position="absolute" bottom={4} left={4} gap={1}>
              {bottomTags.map((tag, idx) => (
                <Tag key={idx} icon={tag.icon} text={tag.text} color="#fff" />
              ))}
            </Flex>
          </Box>
        </Box>
        {/* Right Section (Boy Image + Info) */}
        <Box
          flex="1"
          minW="208px"
          maxW="258px"
          display={{ base: "none", md: "flex" }}
          flexDirection="column"
          gap={0}
          position={"relative"}
        >
          <Box mb={4}>
            <Text
              ml={"auto"}
              width="50%"
              fontWeight="500"
              fontSize="sm"
              color="gray.700"
            >
              Affirmations & Personalization
            </Text>
            <Flex align="center" gap={2} mt={2}>
              <Text fontSize="xs" width="90%" fontWeight="500" color="gray.500">
                Small words, big impact—crafted for you to tackle challenges.
              </Text>
              {/* <Box
                height={"24px"} asChild> */}
                <svg
                  width="52"
                  height="52"
                  viewBox="0 0 52 52"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M26 4.33333C14.04 4.33333 4.33337 14.04 4.33337 26C4.33337 37.96 14.04 47.6667 26 47.6667C37.96 47.6667 47.6667 37.96 47.6667 26"
                    stroke="#5A5A5A"
                    strokeWidth="3.75"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M28.1666 23.8333L45.9333 6.06667"
                    stroke="#5A5A5A"
                    strokeWidth="3.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M47.6667 14.7983V4.33333H37.2017"
                    stroke="#5A5A5A"
                    strokeWidth="3.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              {/* </Box> */}
            </Flex>
          </Box>
          <Box
            borderRadius="16px"
            overflow="hidden"
            boxShadow="0 4px 24px rgba(0,0,0,0.08)"
            bg="#e6e6e6"
            p={3}
            display="flex"
            flexDirection="column"
            alignItems="center"
            width="auto"
            height="280.2455px"
            flexShrink={0}
            background="url('/images/unsplash_boy.png') #DFE1E3 bottom right / 80% no-repeat"
          >
            <Text
              w={'60%'}
              left={4}
              bg="whiteAlpha.200"
              px={3}
              py={2}
              borderRadius="16px"
              fontSize="10px"
              color={"#fff"}
              mb={2}
              ml={'auto'}
              backdropFilter="blur(28px)"
            >
              Your daily dose of positivity, tailored just for you!
            </Text>
            <Flex position="absolute" bottom={4} left={4} gap={1}>
              {rightTags.map((tag, idx) => (
                <Tag
                  key={idx}
                  icon={tag.icon}
                  text={tag.text}
                  color="#fff"
                />
              ))}
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Banner;
