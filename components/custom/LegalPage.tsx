import type { ReactNode } from "react";
import { Box, Text } from "@chakra-ui/react";
import Navbar from "@/components/custom/Navbar";
import Footer from "@/components/custom/Footer";

/**
 * The shared frame for the privacy policy and the terms, so the two documents
 * cannot drift apart visually and both stay recognisably part of the site.
 */
export const LegalSection = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <Box pt={"32px"}>
    <Text textStyle={"title"} fontWeight={700} asChild>
      <h2>{title}</h2>
    </Text>
    <Box pt={"8px"} color={"dark.300"} textStyle={"body_lg"} lineHeight={1.7}>
      {children}
    </Box>
  </Box>
);

const LegalPage = ({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) => {
  return (
    <>
      <Box padding={{ base: "15px", sm: "30px 40px", md: "3%" }}>
        <Navbar />
        <Box maxW={"720px"} mx={"auto"} pt={{ base: "32px", md: "56px" }} pb={"64px"}>
          <Text textStyle={"h4"} asChild>
            <h1>{title}</h1>
          </Text>
          <Text pt={"8px"} color={"dark.200"} textStyle={"body_sm"}>
            Last updated: {updated}
          </Text>
          {children}
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default LegalPage;
