import { Flex, Icon, Text } from "@chakra-ui/react";
import Image from "next/image";

interface TagProps {
  icon: string;
  text: string;
  color?: string;
}

const Tag = ({ icon, text, color }: TagProps) => {
  return (
    <Flex
      padding={"4px 8px"}
      alignItems={"center"}
      gap={"2px"}
      borderRadius={"12px"}
      border={"1px solid"}
      borderColor={"dark.50"}
      width={"max-content"}
      textStyle={"caption"}
       bg="whiteAlpha.100"
              backdropFilter="blur(18px)"
    >
        <Icon asChild>
          <Image src={icon} alt="icon" width={16} height={16} />
        </Icon>
        <Text fontSize="10px" fontWeight="normal" color={color}>
          {text}
        </Text>
    </Flex>
  );
};

export default Tag;
