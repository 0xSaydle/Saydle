"use client";

import type { ReactNode } from "react";
import React from "react";
// `Provider` already mounts ChakraProvider with the Saydle theme and wraps it in
// ColorModeProvider, so mounting ChakraProvider again out here was redundant.
import { Provider } from "@/components/ui/provider";

/**
 * No <Toaster /> here on purpose. It renders inline during SSR but portals to
 * the top of <body> on the client, so every page hydrated with a mismatch
 * (React #418) and re-rendered on the client. Every toaster.create() call in
 * this repo lives under a parked `_` route, so the landing site never raises a
 * toast anyway. Put it back alongside the dashboard when those routes return.
 */
export function ClientProviders({ children }: { children: ReactNode }) {
  return <Provider>{children}</Provider>;
}
