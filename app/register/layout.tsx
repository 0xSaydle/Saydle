import { Box } from "@chakra-ui/react";
import { Provider } from "@/components/ui/provider";

import Navbar from "@/components/custom/Navbar";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
  
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
    
  );
};

export default Layout;
