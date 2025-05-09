import { Box, Flex, Text, Input, Image as ChakraImage } from "@chakra-ui/react";
import LoginWithGoogleBtn from "@/components/custom/LoginWithGoogleBtn";
import Image from "next/image";
import form_banner from "@/public/images/register_girl.svg";
import Form from "next/form";
import { Field } from "@/components/ui/field";
import { InputGroup } from "@/components/ui/input-group";
import { MdOutlineEmail } from "react-icons/md";

const page = () => {
  const validateAndSubmit = async (formData: FormData) => {
    "use server";
    const userEmail = formData.get("email");
    console.log(userEmail);
  };
  return (
    <Flex gap={"5px"} justifyContent={"space-between"} mt={"5%"}>
      <Flex
        flexDirection={"column"}
        gap={"10px"}
        width={{md:"50vw", sm:"100%"}}
        padding={"40px"}
      >
        <Text textStyle={"h1"}>Welcome!</Text>
        <Text textStyle={"sub"}>Your new way to form healthy habits</Text>
        <Flex pt={"10px"} gap={"20px"} flexDirection={"column"} asChild>
          <Form action={validateAndSubmit}>
            <Field
              label="Sign up with email"
              errorText="This field is required"
            >
              <InputGroup
                width={"100%"}
                flex="1"
                startElement={<MdOutlineEmail />}
              >
                <Input
                  name="email"
                  size={"md"}
                  required
                  placeholder="Enter your email"
                  width={"100%"}
                />
              </InputGroup>
            </Field>
            <Box
              mt={"10px"}
              color={"white"}
              rounded={"lg"}
              textStyle={"button_sm"}
              width={"100%"}
              padding="8px 12px"
              background={"secondary.600"}
              asChild
            >
              <button type="submit">Sign Up</button>
            </Box>
          </Form>
        </Flex>
        <Text m={"10px auto"}>OR</Text>
        <LoginWithGoogleBtn prop="up" />
      </Flex>
      <Flex
        width={"50vw"}
        backgroundColor={"secondary.600"}
        py="30px"
        pl="30px"
        flexDirection={"column"}
        alignItems={"center"}
        hideBelow={"md"}
        mr={"-70px"}
      >
        <ChakraImage asChild>
          <Image alt="banner" src={form_banner} />
        </ChakraImage>
      </Flex>
    </Flex>
  );
};

export default page;
