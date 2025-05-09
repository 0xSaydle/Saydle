import { ReactNode } from "react";
import { Provider } from "@/components/ui/provider";
import { GeneralSans } from "../fonts";

export default function OnboardingLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={`${GeneralSans.className} antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
