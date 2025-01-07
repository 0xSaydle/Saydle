
import { Box, Flex } from "@chakra-ui/react";
import Tag from "../../components/custom/Tag";
import purple from "../../public/icons/vuesax/purple.svg"
import pink from "../../public/icons/vuesax/pink.svg"
import Navbar from "../../components/custom/Navbar";
import HeadlinerText from "../../components/custom/HeadlinerText";
const Home = () => {
  return (
    <Box
      padding={"50px"}
      position={"relative"}
      asChild
    >
        <div>
      <Navbar />
      <Flex  asChild>
        <div>
        <Tag icon={pink} text="Positivity" />
        <Tag icon={purple} text="Wellness" />
        </div>
      </Flex>
      <HeadlinerText/>
    </div>
  </Box>
  );
};

export default Home;
