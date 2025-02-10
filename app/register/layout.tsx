import { Box, Flex, Button, Text } from "@chakra-ui/react";
import { Provider } from "@/components/ui/provider";

import { GeneralSans } from "../fonts";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html suppressHydrationWarning>
      <body className={`${GeneralSans.className} antialiased`}>
        <Provider>
          <Flex
            as="nav"
            align="center"
            justify="space-between"
            padding="1.5rem"
            bg="teal.500"
            color="white"
          >
            <Flex align="center">
              <Button variant="ghost" colorScheme="whiteAlpha" mr="4">
                Left
              </Button>
              <Button variant="ghost" colorScheme="whiteAlpha">
                Right
              </Button>
            </Flex>
            <Text fontSize="xl" fontWeight="bold">
              Saydle
            </Text>
            <Box></Box> {/* Empty box to balance the layout */}
        </Flex>
        
          <Box>{children}</Box>
        </Provider>
      </body>
    </html>
  );
};

export default Layout;
