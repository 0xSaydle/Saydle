import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";
import { supabaseAdmin } from "@/middleware";
// import { supabase } from "@/middleware";

type WebhookMeta = {
  test_mode: boolean;
  event_name: string;
  custom_data: {
    user_id: string;
    user_email: string;
    internal_ref: string;
  };
  webhook_id: string;
};

type WebhookData = {
  type: string;
  id: string;
  attributes: {
    status: string;
    user_email: string;
    store_id: number;
    customer_id: number;
    order_id: number;
    order_item_id: number;
    product_id: number;
    variant_id: number;
    product_name: string;
    variant_name: string;
    user_name: string;
    status_formatted: string;
    card_brand: string;
    card_last_four: string;
    pause: boolean | null;
    cancelled: boolean;
    trial_ends_at: string | null;
    billing_anchor: number;
    renews_at: string;
    ends_at: string | null;
    created_at: string;
    updated_at: string;
    test_mode: boolean;
  };
};

export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get("X-Signature");
    const body = await request.json();
    const { meta, data } = body;

    if (!signature) {
      return NextResponse.json({ error: "No signature" }, { status: 401 });
    }

    // Verify webhook signature
    const hmac = createHmac(
      "sha256",
      process.env.LEMON_SQUEEZY_WEBHOOK_SECRET!
    );
    hmac.update(JSON.stringify(body));
    const computedSignature = hmac.digest("hex");

    if (computedSignature !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    if (!meta || !data) {
      return NextResponse.json(
        { error: "Invalid webhook payload" },
        { status: 400 }
      );
    }

    const eventName = meta.event_name;
    const subscriptionId = data.id;
    const email = data.attributes.user_email;

    switch (eventName) {
      case "subscription_created":
        await handleSubscriptionCreated(email, subscriptionId);
        break;
      // case "subscription_updated":
      //   await handleSubscriptionUpdated(email, subscriptionId);
      //   break;
      // case "subscription_cancelled":
      //   await handleSubscriptionCancelled(email, subscriptionId);
      //   break;
      // case "subscription_payment_success":
      //   await handleSubscriptionPaymentSuccess(email, subscriptionId);
      //   break;
      // case "subscription_payment_failed":
      //   await handleSubscriptionPaymentFailed(email, subscriptionId);
      //   break;
      // case "subscription_plan_changed":
      //   await handleSubscriptionPlanChanged(email, subscriptionId);
        // break;
      default:
        console.log(`Unhandled event type: ${eventName}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function handleSubscriptionCreated(meta: WebhookMeta, data: WebhookData) {
  // const { error } = await supabaseAdmin.rpc("handle_subscription_created", {
  //   p_meta: meta,
  //   p_data: data,
  // });
  const { error } = await supabaseAdmin
    .from("users")
    .update({
      email: meta.custom_data.user_email,
    })
    .eq("id", meta.custom_data.user_id);
  console.log("handleSubscriptionCreated", "Meta: ", meta, "Data: ", data);
  if (error) {
    console.error("Error handling subscription creation:", error);
    throw error;
  }
}

// async function handleSubscriptionUpdated(meta: WebhookMeta, data: WebhookData) {
//   const { error } = await supabase.rpc("handle_subscription_created", {
//     p_meta: meta,
//     p_data: data,
//   });

//   if (error) {
//     console.error("Error handling subscription update:", error);
//     throw error;
//   }
// }

// async function handleSubscriptionCancelled(
//   meta: WebhookMeta,
//   data: WebhookData
// ) {
//   const { error } = await supabase.rpc("handle_subscription_created", {
//     p_meta: meta,
//     p_data: data,
//   });

//   if (error) {
//     console.error("Error handling subscription cancellation:", error);
//     throw error;
//   }
// }

// async function handleSubscriptionPaymentSuccess(
//   meta: WebhookMeta,
//   data: WebhookData
// ) {
//   const { error } = await supabase.rpc("handle_subscription_created", {
//     p_meta: meta,
//     p_data: data,
//   });

//   if (error) {
//     console.error("Error handling subscription payment success:", error);
//     throw error;
//   }
// }

// async function handleSubscriptionPaymentFailed(
//   meta: WebhookMeta,
//   data: WebhookData
// ) {
//   const { error } = await supabase.rpc("handle_subscription_created", {
//     p_meta: meta,
//     p_data: data,
//   });

//   if (error) {
//     console.error("Error handling subscription payment failure:", error);
//     throw error;
//   }
// }

// async function handleSubscriptionPlanChanged(
//   meta: WebhookMeta,
//   data: WebhookData
// ) {
//   const { error } = await supabase.rpc("handle_subscription_created", {
//     p_meta: meta,
//     p_data: data,
//   });

//   if (error) {
//     console.error("Error handling subscription plan change:", error);
//     throw error;
//   }
// }
