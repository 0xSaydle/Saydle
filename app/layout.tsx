import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "@/components/ui/provider";
import { GeneralSans } from "./fonts";
import theme from "../theme";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeneralSans.className} antialiased`}>
        <ChakraProvider value={theme}>
          <Provider>
            <SessionProvider>{children}</SessionProvider>
            <Toaster />
          </Provider>
        </ChakraProvider>
      </body>
    </html>
  );
}
