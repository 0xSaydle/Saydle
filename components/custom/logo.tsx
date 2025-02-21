import { SystemStyleObject, Text } from "@chakra-ui/react";
import Link from "next/link";
import { Poppins } from "@/app/fonts";
export const Logo = ({ css }: { css?: SystemStyleObject }) => {
  return (
    <Text
      className={`${Poppins.className}`}
      textStyle="menu"
      fontSize={"20px"}
      fontWeight={"900"}
      css={css}
      asChild
    >
      <Link href="/">Saydle</Link>
    </Text>
  );
};
