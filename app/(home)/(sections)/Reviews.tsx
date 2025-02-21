import { Box, Text, Flex, Icon } from "@chakra-ui/react";
import Image, { StaticImageData } from "next/image";
import russ from "@/public/images/Dianne.svg";
``;
import theresa from "@/public/images/theresa.svg";
``;

const ReviewData = [
  {
    highlight: "Saydle knows what you need to hear.",
    quote:
      "“I love how Saydle understands my struggles and sends exactly what I need to hear. It’s like having a personal cheerleader in my pocket!”",
    by: "Theresa Webb",
    image: theresa,
    profession: "Medical Assistant",
  },
  {
    highlight: "Personalizations make all the difference.",
    quote:
      "“The personalized touch makes all the difference. Saydle’s affirmations have helped me stay positive and focused, even during challenging times.”",
    by: "Dianne Russell",
    image: russ,
    profession: "Marketing Coordinator",
  },
];
const Review = ({
  highlight,
  quote,
  by,
  image,
  profession,
}: {
  highlight: string;
  quote: string;
  by: string;
  image: StaticImageData;
  profession: string;
}) => {
  return (
    <Flex
      flexDirection={"column"}
      textAlign={{ base: "center", md: "left" }}
      // gap={"10px"}
      asChild
      my={"20px"}
      maxWidth={"530px"}
    >
      <div>
        <Text mb={"15px"} fontSize={"16px"} fontWeight={"600"} color={"secondary.900"}>
          {highlight}
        </Text>
        <Text mb={"25px"} textStyle={"body_lg"} color={"dark.300"}>
          {quote}
        </Text>
        <Flex alignSelf={{base:"center", md:"start"} }alignItems={{base:"center", }} gap={"10px"} asChild>
          <div>
          <Icon fontSize={"42px"} asChild>
            <Image src={image} alt={by} />
          </Icon>
            <Box asChild>
            <div>
            <Text fontSize={"16px"} fontWeight={"700"} color={"secondary.900"}>
              {by}
            </Text>
            <Text fontSize={"14px"} fontWeight={"400"} color={"dark.300"}>
              {profession}
            </Text>
          </div>
        </Box>
          </div>
        </Flex>
      </div>
    </Flex>
  );
};
const Reviews = () => {
  return (
    <Box asChild>
      <div>
        <Text textAlign={"center"} textStyle={{ base: "h5", sm: "h3" }}>
          What our users are saying😍
        </Text>
        <Text textAlign={"center"} textStyle={"body_lg"} color={"dark.300"} maxWidth={"600px"} mx={"auto"} my={"20px"}>
          Choose a plan that suits your journey and start receiving personalized
          affirmations every day
        </Text>
        <Flex flexDirection={{ base: "column", md:"row" }} justifyContent={{"md":"center"}} gap={"20px"} asChild>
          <div>
            {ReviewData.map((review) => (
              <Review
                highlight={review.highlight}
                quote={review.quote}
                by={review.by}
                image={review.image}
                profession={review.profession}
              />
            ))}
          </div>
        </Flex>
      </div>
    </Box>
  );
};

export default Reviews;
