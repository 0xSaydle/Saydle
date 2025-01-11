import {
  Box,
  Flex,
  Text,
  Image as ChakraImage,
  SystemStyleObject,
} from "@chakra-ui/react";
import Image, { StaticImageData } from "next/image";
import one from "../../../public/images/unsplash_girl-book1.png";
import two from "../../../public/images/girl_phone.png";
import three from "../../../public/images/hand_phone.png";

const HowItWorksItems = [
  {
    image: one,
    title: "Share Your Story",
    text: "Tell us about the areas where you need support, and we’ll craft affirmations just for you.",
    style: {
      transform: "translate(0% ,-40%)",
      height: "170%",
      width: "auto",
      borderBottomLeftRadius: "5%",
    },
  },
  {
    image: two,
    title: "Subscribe Securely",
    text: "Sign up with ease using our trusted, secure payment process.",
    style: {
      transform: "translate(20% ,-46%)",
      height: "200%",
    },
  },
  {
    image: three,
    title: "Receive Daily Encouragement",
    text: "Start your day with uplifting, personalized affirmations delivered right to your phone.",
    style: {
      transform: "translate(0% ,-50%)",
      height: "200%",
    },
  },
];
const HowItWorksItem = ({
  image,
  title,
  text,
  style,
}: {
  image: StaticImageData;
  title: string;
  text: string;
  style: SystemStyleObject;
}) => {
  return (
    <Box
      mt={{ base: "150px" }}
      boxShadow={"xs"}
      gap={"100px"}
      p={"20px"}
      bg={"white"}
      borderRadius={"24px"}
      asChild
    >
      <div>
        <Box
          bg="linear-gradient(102deg, #C49EBB 40.11%, #FF6F61 109.93%)"
          height={"150px"}
          borderRadius={"10.398px"}
        >
          <ChakraImage css={style} objectFit={"contain"} asChild>
            <Image src={image} alt={title} />
          </ChakraImage>
        </Box>
        <Text
          mt={"10px"}
          color={"dark.600"}
          textAlign={"center"}
          fontSize={{ base: "17.329px", sm: "20px" }}
        >
          {title}
        </Text>
        <Text
          color={"dark.300"}
          fontSize={{ base: "13.863px;", sm: "16px" }}
          textAlign={"center"}
        >
          {text}
        </Text>
      </div>
    </Box>
  );
};

const HowItWorks = () => {
  return (
    <Box>
      <Text textAlign={"center"} textStyle={{ base: "h5", sm: "h3" }}>
        How It Works
      </Text>
      <Flex>
        <div>
          {HowItWorksItems.map((item, index) => (
            <HowItWorksItem key={index} {...item} />
          ))}
        </div>
      </Flex>
    </Box>
  );
};

export default HowItWorks;
