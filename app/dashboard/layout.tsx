"use client";

import { SessionProvider } from "next-auth/react";
import { Provider } from "@/components/ui/provider";
import { GeneralSans } from "../fonts";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body className={`${GeneralSans.className} antialiased`}>
        <Provider>
          <SessionProvider>{children}</SessionProvider>
        </Provider>
      </body>
    </html>
  );
}
