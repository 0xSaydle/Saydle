import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import Tag from "@/components/custom/Tag";
import purple from "@/public/icons/vuesax/purple.svg";
import pink from "@/public/icons/vuesax/pink.svg";
import Navbar from "@/components/custom/Navbar";
import HeadlinerText from "@/components/custom/HeadlinerText";
import HeroSubText from "@/components/custom/HeroSubText";
import Button from "@/components/custom/button";
import Link from "next/link";
import Image from "next/image";
import icon from "@/public/icons/receive-square.svg";
import WhySadle from "./(sections)/WhySadle";
import { Poppins } from "../fonts";
import HowItWorks from "./(sections)/HowItWorks";
import Subscriptions from "./(sections)/Subscriptions";
import Reviews from "./(sections)/Reviews";
import FAQ from "./(sections)/FAQ";
import Footer from "@/components/custom/Footer";
const Home = () => {
  return (
    <>
      <Box
        padding={{ base: "15px", sm: "30px 40px", md: "3%" }}
        position={"relative"}
        asChild
      >
        <div>
          <Navbar />
          <Flex pt={"24px"} asChild>
            <div>
              <Tag icon={pink} text="Positivity" />
              <Tag icon={purple} text="Wellness" />
            </div>
          </Flex>
          <HeadlinerText />
          <HeroSubText />
          {/* CTA Buttons */}
          <Flex
            gap={"10px"}
            alignItems={"center"}
            borderRadius={"24px"}
            pt={"24px"}
            asChild
          >
            <div>
              <Button bg={"primary.20"} text="Subscribe" path="/login" />
              <Box
                p={"12px 24px"}
                borderRadius={"24px"}
                border={"1px solid"}
                borderColor={"secondary.20"}
                display={"flex"}
                gap={"10px"}
                textStyle={"button_lg"}
                alignItems={"center"}
                asChild
              >
                <Link href={"/about"}>
                  Learn more
                  <Icon fontSize={"24px"} asChild>
                    <Image src={icon} alt="icon"></Image>
                  </Icon>
                </Link>
              </Box>
            </div>
          </Flex>
          {/* Ommitted section here */}

          <Text
            pt={"48px"}
            textAlign={"center"}
            maxWidth={{ base: "347px", sm: "100%" }}
            mx={"auto"}
            textStyle={"body_lg"}
            asChild
          >
            <div>
              At{" "}
              <Text
                className={` ${Poppins.className}`}
                asChild
                textStyle={"title"}
                fontWeight={"700"}
              >
                <span>Saydle</span>
              </Text>
              , we believe that everyone deserves a moment of positivity and
              encouragement each day. Our mission is simple yet profound: to
              support your{" "}
              <Text color={"secondary.20"} asChild>
                <span>mental well-being</span>
              </Text>{" "}
              with{" "}
              <Text textStyle={"body_lg"} color={"primary.20"} asChild>
                <span>affirmations</span>
              </Text>{" "}
              crafted uniquely for you.
            </div>
          </Text>

          <WhySadle />
          <HowItWorks />
          <Subscriptions />
          <Reviews />
          <FAQ />
        </div>
      </Box>
      <Footer />
    </>
  );
};

export default Home;
