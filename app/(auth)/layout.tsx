import Navbar from "@/components/custom/Navbar";
import { Provider } from "../../components/ui/provider";
import { GeneralSans } from "../fonts";
import { Box } from "@chakra-ui/react";
export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <html suppressHydrationWarning>
      <body className={`${GeneralSans.className} antialiased`}>
        <Provider>
        <Box  padding={{ base: "0px 15px", sm: "30px 40px", md: " 20px 4%" }}
            position={"relative"}
            overflowX={"hidden"}>
          <Navbar />
        </Box>
          
          {children}
        </Provider>
      </body>
    </html>
  );
}
