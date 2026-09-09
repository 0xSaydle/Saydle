import { Flex, Icon, Text } from "@chakra-ui/react";
import Image from "next/image";

interface TagProps {
  icon: string;
  text: string;
  /** Chips sitting over photography need a dark scrim to stay readable. */
  onImage?: boolean;
  /** Hero uses a larger chip so it reads at fold scale. */
  size?: "sm" | "lg";
}

const Tag = ({ icon, text, onImage = false, size = "sm" }: TagProps) => {
  const large = size === "lg";
  const iconPx = large ? 22 : 16;

  return (
    <Flex
      layerStyle={onImage ? "tag.onImage" : "tag.base"}
      px={large ? { base: "14px", md: "18px", lg: "20px" } : "12px"}
      py={large ? { base: "9px", md: "11px", lg: "13px" } : "6px"}
      gap={large ? "10px" : "6px"}
      borderRadius={large ? "pill" : "tag"}
    >
      <Icon asChild flexShrink={0} boxSize={`${iconPx}px`}>
        <Image src={icon} alt="" width={iconPx} height={iconPx} />
      </Icon>
      <Text
        as="span"
        fontSize={large ? { base: "15px", md: "16px", lg: "17px" } : "13px"}
        fontWeight={500}
        lineHeight={1.35}
      >
        {text}
      </Text>
    </Flex>
  );
};

export default Tag;
