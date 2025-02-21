import { signIn } from "@/auth";
import { Box, Icon, Text } from "@chakra-ui/react";
import Image from "next/image";
import google from "@/public/Google_Icon.webp";
const LoginWithGoogleBtn = ({ prop }: { prop: string }) => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Box
        padding={"8px 16px"}
        border={"1px solid grey"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        rounded={"lg"}
        cursor={"pointer"}
        w={"100%"}
        asChild
      >
        <button type="submit">
          <Icon ml={"-4px"} fontSize={"24px"} asChild>
            <Image src={google} alt="Google_icon"></Image>
          </Icon>
          <Text fontSize={"14px"}>Sign {prop} with Google</Text>
        </button>
      </Box>
    </form>
  );
};

export default LoginWithGoogleBtn;
