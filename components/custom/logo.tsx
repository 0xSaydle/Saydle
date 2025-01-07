import { SystemStyleObject, Text } from "@chakra-ui/react";
import Link from "next/link";

export const Logo = ({ css }: { css?: SystemStyleObject }) => {
  return (
    <Text
    textStyle="menu"
    fontSize={"25px"}
    fontWeight={"900"}
    css={css}
      asChild
    >
      <Link href="/">Saydle</Link>
    </Text>
  );
};
