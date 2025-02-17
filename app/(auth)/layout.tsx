import { Provider } from "../../components/ui/provider";
import { GeneralSans } from "../fonts";
export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html suppressHydrationWarning>
      <body
        className={`${GeneralSans.className} antialiased`}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}