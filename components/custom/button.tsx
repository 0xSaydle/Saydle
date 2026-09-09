"use client";

import { Box } from "@chakra-ui/react";
import Link from "next/link";

const Button = ({
  bg,
  path = "/#get-the-app",
  text,
  onClick,
}: {
  bg?: string;
  path?: string;
  text: string;
  onClick?: () => void;
}) => {
  return (
    <Box layerStyle={"pill.solid"} bg={bg} asChild>
      <Link href={path} onClick={onClick}>
        {text}
      </Link>
    </Box>
  );
};
export default Button;
