"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider } from "./color-mode";
import SaydleTheme from "../../theme";
import { ThemeProviderProps } from "next-themes";

export function Provider(props: ThemeProviderProps) {
  return (
    <ChakraProvider value={SaydleTheme}>
      <ColorModeProvider
        defaultTheme="light"
        {...props}
        themes={["SaydleTheme"]}
      />
    </ChakraProvider>
  );
}
