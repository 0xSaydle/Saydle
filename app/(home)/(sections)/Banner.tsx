import { Box, Flex, Heading, Text, Image, Icon, Link } from "@chakra-ui/react";
import Tag from "@/components/custom/Tag";
import icon from "@/public/icons/receive-square.svg";
import Button from "@/components/custom/button";
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
    <Box justifyContent={"center"} p={{ base: 8, md: 16 }}>
      <Flex
        direction={{ base: "column", md: "row" }}
        alignItems="flex-end"
        gap={2} 
      >
        {/* Left Section */}
        <Box flex="1" maxW="450px">
          <Flex gap={2} mb={4}>
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
          >
            <Heading
              as="h1"
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="bold"
              mb={2}
            >
              EMBRACE EACH DAY WITH
            </Heading>
            <Heading
              as="h2"
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="bold"
              color="#FF6B6B"
            >
              UPLIFTING AFFIRMATIONS
            </Heading>
          </Box>
          <Text color="gray.600" mb={6}>
            Discover the power of daily affirmations crafted uniquely for
            you—providing personalized encouragement to help you navigate
            life&apos;s challenges.
          </Text>
          {/* CTA Buttons */}
          <Flex
            gap={"10px"}
            alignItems={"center"}
            borderRadius={"24px"}
            pt={"24px"}
            asChild
          >
            <div>
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
                    <Image src={icon} alt="icon" />
                  </Icon>
                </Link>
              </Box>
            </div>
          </Flex>
        </Box>
        {/* Center Section (Girl Image) */}
        <Box flex="1" maxW="400px" position="relative">
          <Box
            borderRadius="32px"
            overflow="hidden"
            boxShadow="0 4px 24px rgba(0,0,0,0.08)"
            position="relative"
            bg="#e6e6e6"
            // width="324.5px"
            height="505.34px"
            flexShrink={0}
            background="url('/images/unsplash_girl.png') lightgray bottom right / 90% no-repeat"
          >
            <Box
              position="absolute"
              top={4}
              right={4}
              bg="whiteAlpha.200"
              px={3}
              py={2}
              borderRadius="16px"
              fontSize="sm"
              fontWeight="medium"
              backdropFilter="blur(8px)"
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
              <Box
                height={"24px"} asChild>
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
              </Box>
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
            background="url('/images/unsplash_boy.png') lightgray bottom right / 80% no-repeat"
          >
            <Text
              // position="absolute"
              // top={"130px"}
              left={4}
              bg="whiteAlpha.200"
              px={3}
              py={2}
              borderRadius="16px"
              fontSize="10px"
              // fontWeight="semibold"
              color={"#fff"}
              mb={2}
              backdropFilter="blur(8px)"
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
                  fontSize="sm"
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
