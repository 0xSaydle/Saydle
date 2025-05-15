"use server";

import { auth } from "@/auth";
import { NextResponse } from "next/server";

interface CheckoutResponse {
  data: {
    attributes: {
      url: string;
    };
  };
}
export async function generateCheckoutUrl(productId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login`);
  }
  const payload = {
    data: {
      type: 'checkouts',
      attributes: {
        checkout_data: {
          custom: {
            user_id: session.user.id,
            user_email: session.user.email || '',
            internal_ref: `sub_${Date.now()}`
          }
        },
        product_options: {
          redirect_url: `${process.env.NEXTAUTH_URL}/dashboard/onboarding/step/6`,
          receipt_button_text: 'Continue to Saydle',
          receipt_thank_you_note: 'Thank you for subscribing!'
        }
      },
      relationships: {
        store: {
          data: { type: 'stores', id: process.env.LEMON_SQUEEZY_STORE_ID }
        },
        variant: {
          data: { type: 'variants', id: productId }
        }
      }
    }
  };
  try {
    const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
      method: "POST",
      headers: {
      "Content-Type": "application/vnd.api+json",
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${process.env.LEMON_SQUEEZY_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
      throw new Error(errorData?.errors?.[0]?.detail || 'Failed to create checkout');
  }

    const { data }: CheckoutResponse = await response.json();
    return data.attributes.url;
  } catch (error) {
    console.error("Error generating checkout URL:", error);
    throw new Error("Failed to generate checkout URL");
  }
}
