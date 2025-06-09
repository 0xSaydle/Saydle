import type { ReactNode } from "react";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import theme from "../theme";
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "@/components/ui/provider";
import { GeneralSans } from "./fonts";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeneralSans.className} antialiased`}>
        <ChakraProvider value={theme}>
          <SessionProvider>
            <Provider>
              {children}
              <Toaster />
            </Provider>
          </SessionProvider>
        </ChakraProvider>
      </body>
    </html>
  );
}
