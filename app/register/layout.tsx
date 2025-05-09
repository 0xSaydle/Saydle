import { Box } from "@chakra-ui/react";
import { Provider } from "@/components/ui/provider";

import { GeneralSans } from "../fonts";
import Navbar from "@/components/custom/Navbar";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <body className={`${GeneralSans.className} antialiased`}>
        <Provider>
          <Box
            padding={{ base: "0px 15px", sm: "30px 40px", md: " 20px 4%" }}
            position={"relative"}
            overflowX={"hidden"}
          >
            <Navbar />
          </Box>
          <Box padding={{ base: "0px 15px", sm: "30px 40px", md: "20px 0px 20px 4%" }}
            position={"relative"}
            overflowX={"hidden"}>{children}</Box>
        </Provider>
      </body>
    </html>
  );
};

export default Layout;
