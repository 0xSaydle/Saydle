"use client"

import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"
import SaydleTheme from "../../theme"

export function Provider(props: ColorModeProviderProps) {
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
