import { Flex, Icon, Text } from "@chakra-ui/react";
import Image from "next/image";

interface TagProps {
  icon: string;
  text: string;
}

const Tag = ({ icon, text }: TagProps) => {
  return (
    <Flex
      padding={"8px 12px"}
      alignItems={"center"}
      gap={"4px"}
      borderRadius={"24px"}
      border={"1px solid"}
      borderColor={"dark.50"}
      width={"max-content"}
      asChild
      textStyle={"caption"}
      backdropFilter={"lg"}
    >
      <div>
        <Icon
        
          asChild>
          <Image src={icon} alt="icon"></Image>
        </Icon>
        <Text>{text}</Text>
      </div>
    </Flex>
  );
};

export default Tag;
