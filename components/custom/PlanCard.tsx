import { Flex, Text, Box, Icon } from "@chakra-ui/react";
import Image from "next/image";
import curved_arrow from "@/public/icons/curved_arrow.svg";
import { generateCheckoutUrl } from "@/app/helpers/generateCheckoutUrl";
import { SubscribeBtn } from "./SubscribeBtn";
import Link from "next/link";

const PlanCard = ({
  title,
  period,
  description,
  price,
  features,
  icon,
  special,
  Button,
}: {
  title: string;
  description: string;
  price: string;
  features: string[];
  icon: string;
  period: string;
  special?: string;
  Button?: React.ReactNode;
}) => {
  // const checkoutUrl = await generateCheckoutUrl(productId);
  return (
    <Box
      background={"white"}
      borderRadius={"20px"}
      pb={"40px"}
      asChild
      minWidth={{ md: "330px" }}
      maxWidth={{ base: "100%", md: "26%" }}
    >
      <div>
        <Flex
          border={"1px solid #E2E8F0"}
          p={"20px"}
          pb={"40px"}
          background={"#F8FAFC"}
          alignItems={"center"}
          gap={"20px"}
          asChild
          borderRadius={"20px 20px 0px 0px"}
        >
          <div>
            <Text fontSize={"28px"} asChild>
              <span>{icon}</span>
            </Text>
            <Flex
              direction={"column"}
              justifyContent={"center"}
              minH={"70px"}
              position={"relative"}
              asChild
            >
              <div>
                <Text fontWeight={"600"} fontSize={"18px"}>
                  {title}
                </Text>
                <Text fontSize={"14px"} color={"dark.300"}>
                  {description}
                </Text>
                {special && (
                  <Flex
                    textStyle={"body_lg"}
                    color={"#FF6F61"}
                    alignItems={"flex-start"}
                    gap={"10px"}
                    position={"absolute"}
                    top={-65}
                    right={-10}
                    hideBelow={"md"}
                    w={"max-content"}
                    asChild
                  >
                    <div>
                      <Icon fontSize={"100px"} asChild>
                        <Image src={curved_arrow} alt="curved_arrow" />
                      </Icon>
                      Most popular
                    </div>
                  </Flex>
                )}
              </div>
            </Flex>
          </div>
        </Flex>
        <Box p={"20px"} asChild>
          <div>
            <Flex alignItems={"end"} asChild>
              <span>
                <Text textStyle={"h2"}>{price}</Text>
                <Text textStyle={"body_sm"} color={"light.800"}>
                  /{period}
                </Text>
              </span>
            </Flex>
            { Button || <Text
              data-state={special}
              _on={{
                background: "primary.20",
              }}
              color={"light.400"}
              display={"block"}
              textStyle={"button_lg"}
              padding={"12px 24px"}
              bg={"dark.100"}
              borderRadius={"24px"}
              my={"10px"}
              textDecoration={"none"}
              textAlign={"center"}
              asChild
            >
              <Link href={"/dashboard/subscription"}>
                Subscribe to our {title} plan
              </Link>
            </Text>}
            <Text my={"6px 16px"} color={"light.900"} fontSize={"13px"}>
              FEATURES
            </Text>
            <Flex flexDirection={"column"} gap={"8px"} asChild>
              <ul>
                {features.map((feature, index) => (
                  <Text
                    key={index}
                    textStyle={"body_sm"}
                    color={"dark.500"}
                    display={"flex"}
                    gap={"6px"}
                    alignItems={"center"}
                    asChild
                  >
                    <li>
                      <Icon asChild height={"20px"} width={"20px"}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="21"
                          height="21"
                          viewBox="0 0 21 21"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10.5 18.1619C14.9183 18.1619 18.5 14.5801 18.5 10.1619C18.5 5.74359 14.9183 2.16187 10.5 2.16187C6.08172 2.16187 2.5 5.74359 2.5 10.1619C2.5 14.5801 6.08172 18.1619 10.5 18.1619ZM14.2071 8.86897C14.5976 8.47845 14.5976 7.84528 14.2071 7.45476C13.8166 7.06423 13.1834 7.06423 12.7929 7.45476L9.5 10.7477L8.20711 9.45476C7.81658 9.06423 7.18342 9.06423 6.79289 9.45476C6.40237 9.84528 6.40237 10.4784 6.79289 10.869L8.79289 12.869C9.18342 13.2595 9.81658 13.2595 10.2071 12.869L14.2071 8.86897Z"
                            fill="#FF6F61"
                          />
                        </svg>
                      </Icon>
                      {feature}
                    </li>
                  </Text>
                ))}
              </ul>
            </Flex>
          </div>
        </Box>
      </div>
    </Box>
  );
};

export default PlanCard;
