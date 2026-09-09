import { Box, Text } from "@chakra-ui/react";
import Navbar from "@/components/custom/Navbar";
import { Poppins } from "../fonts";
import WhySadle from "./(sections)/WhySadle";
import HowItWorks from "./(sections)/HowItWorks";
import FAQ from "./(sections)/FAQ";
import GetTheApp from "./(sections)/GetTheApp";
import Banner from "./(sections)/Banner";
import Footer from "@/components/custom/Footer";

const shellPx = { base: "20px", md: "24px", lg: "clamp(24px, 3vw, 48px)" };

const Home = () => {
  return (
    <>
      <Box
        px={shellPx}
        pt={{ base: "16px", md: "20px" }}
        minH={{ md: "100svh" }}
        display={{ md: "flex" }}
        flexDirection={{ md: "column" }}
      >
        <Navbar />
        <Banner />
      </Box>

      <Box px={shellPx}>
        <Text
          pt={{ base: "64px", md: "88px" }}
          textAlign={"center"}
          maxW={"48ch"}
          mx={"auto"}
          textStyle={{ base: "body_lg", md: "sub" }}
          color={"dark.300"}
        >
          At{" "}
          <Text className={Poppins.className} fontWeight={700} color={"dark.500"} asChild>
            <span>Saydle</span>
          </Text>
          , everyone deserves a quiet line of encouragement each day. We write
          it for you.
        </Text>

        <WhySadle />
        <HowItWorks />
        <GetTheApp />
        <FAQ />
      </Box>
      <Footer />
    </>
  );
};

export default Home;
