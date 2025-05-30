import { GeneralSans } from "./fonts";
import { Provider } from "@/components/ui/provider";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeneralSans.className} antialiased`}>
        <Provider>
          <SessionProvider>{children}</SessionProvider>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
