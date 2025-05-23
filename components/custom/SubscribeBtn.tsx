"use client";
import { Text, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const SubscribeBtn = ({
  title,
  special,
  productId,
}: {
  title: string;
  special?: string;
  productId?: string;
}) => {
  const [checkoutUrl, setCheckoutUrl] = useState("/login");

  useEffect(() => {
    if (productId) {
      console.log("productId: ", productId);
      fetch(`${baseUrl}/api/actions/generateCheckoutUrl`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      })
        .then((res) => res.json())
        .then((data) => setCheckoutUrl(data.url))
        .catch(() => setCheckoutUrl("/login"));
    }
  }, [productId]);

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
      <Link href={checkoutUrl}>Subscribe to our {title} plan</Link>
    </Text>
  );
};
