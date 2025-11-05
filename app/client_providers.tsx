// app/providers.tsx
"use client";

import type { ReactNode } from "react";
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import theme from "../theme"; // Adjust path if needed
import { Toaster } from "@/components/ui/toaster";
import { Provider } from "@/components/ui/provider"; // Assuming this is also a client-side provider

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider value={theme}> {/* Use 'theme' prop, not 'value' */}
      <SessionProvider>
        <Provider>
          {children}
          <Toaster />
        </Provider>
      </SessionProvider>
    </ChakraProvider>
  );
}