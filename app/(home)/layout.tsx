import { Provider } from "../../components/ui/provider";
import { poppins } from "../fonts";
import "../globals.css";
export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html suppressHydrationWarning>
      <body className={`${poppins.className} antialiased`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
