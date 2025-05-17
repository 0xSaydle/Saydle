import Navbar from "@/components/custom/Navbar";
import { Provider } from "../../components/ui/provider";
import { Box } from "@chakra-ui/react";
export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (

        <Provider>
        <Box  padding={{ base: "0px 15px", sm: "30px 40px", md: " 20px 4%" }}
            position={"relative"}
            overflowX={"hidden"}>
          <Navbar />
        </Box>
          
          {children}
        </Provider>
   
  );
}
