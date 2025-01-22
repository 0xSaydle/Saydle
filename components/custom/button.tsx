import { Box } from "@chakra-ui/react";
import Link from "next/link";

const Button = ({
  bg,
  path,
  text,
}: {
  bg: string;
  path?: string;
  text: string;
}) => {
  return (
    <Box
      bg={bg}
      color={"light.400"}
      textStyle={"button_lg"}
      p={"12px 24px"}
      borderRadius={"24px"}
      asChild
    >
      <Link href={path ? path : "/subscribe"}> {text}</Link>
    </Box>
  );
};
export default Button;
