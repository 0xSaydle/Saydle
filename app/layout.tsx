
import type { ReactNode } from "react";
import React from "react";

import { ClientProviders } from "./client_providers"; // Import your new client wrapper
import { GeneralSans } from "./fonts";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeneralSans.className} antialiased`}>
        <ClientProviders> {/* Render your client-side providers */}
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}