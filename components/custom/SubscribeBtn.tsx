import { generateCheckoutUrl } from "@/helpers/generateCheckoutUrl";
import { Text, Link } from "@chakra-ui/react";

export const SubscribeBtn = async ({
  title,
  special,
  productId,
}: {
  title: string;
  special?: string;
  productId?: string;
}) => {
  const checkoutUrl = productId
    ? await generateCheckoutUrl(productId)
    : "/login";
  return (
    <Text
      data-state={special}
   
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
      <Link href={checkoutUrl as string}>Subscribe to our {title} plan</Link>
    </Text>
  );
};
