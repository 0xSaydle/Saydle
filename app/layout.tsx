import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import React from "react";

import { ClientProviders } from "./client_providers";
import { GeneralSans } from "./fonts";
import "./globals.css";

/**
 * app/icon.png and app/apple-icon.png are App Router conventions: Next emits the
 * <link rel="icon"> and <link rel="apple-touch-icon"> tags from those filenames,
 * so icons are deliberately not declared here. Regenerate them with
 * scripts/favicon.sh rather than editing the PNGs by hand.
 *
 * The privacy and terms pages set their own absolute titles, which override the
 * default below rather than extending it. That is why there is no title.template.
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://saydle.com"),
  title: "Saydle: Daily Affirmations",
  description:
    "A new affirmation every morning, written for you and read in a calm voice.",
  openGraph: {
    type: "website",
    siteName: "Saydle",
    url: "https://saydle.com",
    title: "Saydle: Daily Affirmations",
    description:
      "A new affirmation every morning, written for you and read in a calm voice.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saydle: Daily Affirmations",
    description:
      "A new affirmation every morning, written for you and read in a calm voice.",
  },
};

export const viewport: Viewport = {
  themeColor: "#FF6F61",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeneralSans.className} antialiased`}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
