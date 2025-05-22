import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "node:crypto";
import supabase from "@/supabase/supabase_client";


export async function POST(request: NextRequest) {
  try {
    const signature = request.headers.get("X-Signature");
    const payload = await request.json();

    console.log(payload);
    if (!signature) {
      return NextResponse.json({ error: "No signature" }, { status: 401 });
    }

    const hmac = createHmac("sha256", process.env.LEMON_SQUEEZY_WEBHOOK_SECRET!);
    hmac.update(JSON.stringify(payload));
    const computedSignature = hmac.digest("hex");

    if (computedSignature !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
    
    //variables
    const attributes = payload.data.attributes;
    const eventName = payload.meta.event_name;
    const email = attributes.email;
    const subscriptionId = attributes.subscription_item.subscription_id;
    const status = attributes.status;
    const customData = attributes.custom;
    // Handling diff types of events
    switch (eventName) {
      case "subscription_created":
        await handleSubscriptionCreated(email, subscriptionId, status, customData);
        break;
      case "subscription_updated":
        await handleSubscriptionUpdated(email, subscriptionId, status, customData);
        break;
      case "subscription_cancelled":
        await handleSubscriptionCancelled(email, subscriptionId, status, customData);
        break;
      case "subscription_payment_success":
        await handleSubscriptionPaymentSuccess(email, subscriptionId, status, customData);
      case "subscription_payment_failed":
        await handleSubscriptionPaymentFailed(email, subscriptionId, status, customData);
      case "subscription_plan_changed":
        await handleSubscriptionPlanChanged(email, subscriptionId, status, customData);
        break;
      default:
        console.log(`Unhandled event: ${eventName}`);
        return NextResponse.json({ message: "Unhandled event" }, { status: 400 });
        break;
    }
    return NextResponse.json({ message: "Webhook received" }, { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }

  // Handlers 


  async function handleSubscriptionCreated(email: string, subscriptionId: string, status: string, customData: {user_id: string}) {
    const userId = customData.user_id;
    const { data, error } = await supabase
      .from("users")
      .update({
        subscription_id: subscriptionId,
        subscription_status: "active",
      })
      .eq("id", userId)
      .select();

    console.log(data);

    if (error) {
      console.error("Error updating user:", error);
      return NextResponse.json({ error: "Error updating user" }, { status: 500 });
    }
  
  }

  async function handleSubscriptionUpdated(email: string, subscriptionId: string, status: string, customData: {user_id: string}) {
    const userId = customData.user_id;
    const { data, error } = await supabase
      .from("users")
      .update({
        subscription_id: subscriptionId,
        subscription_status: status,
      })
      .eq("id", userId)
      .select();
    console.log(data);
    if (error) {
      console.error("Error updating user:", error);
   
    }
  }
  async function handleSubscriptionCancelled(email: string, subscriptionId: string, status: string, customData: {user_id: string}) {
      const userId = customData.user_id;
      const { data, error } = await supabase
        .from("users")
        .update({
          subscription_id: subscriptionId,
          subscription_status: status,
        }).eq("id", userId)
        .select();

      if (error) {
        console.error("Error updating user:", error);
      }
    }

    async function handleSubscriptionPaymentSuccess(email: string, subscriptionId: string, status: string, customData: {user_id: string}) {
      const userId = customData.user_id;
      const { data, error } = await supabase
        .from("users")
        .update({
          subscription_id: subscriptionId,
          subscription_status: status,
        })
        .eq("id", userId)
        .select();
      console.log(data);
      if (error) {
        console.error("Error updating user:", error);
      }
    }

    async function handleSubscriptionPlanChanged(email: string, subscriptionId: string, status: string, customData: {user_id: string}) {
      const userId = customData.user_id;
      const { data, error } = await supabase
        .from("users")
        .update({
          subscription_id: subscriptionId,
          subscription_status: status,
        })
        .eq("id", userId)
        .select();
      console.log(data);
      if (error) {
        console.error("Error updating user:", error);
      }
    }

    async function handleSubscriptionPaymentFailed(email: string, subscriptionId: string, status: string, customData: {user_id: string}) {
      const userId = customData.user_id;
      const { data, error } = await supabase
        .from("users")
        .update({
          subscription_id: subscriptionId,
          subscription_status: status,
        })
        .eq("id", userId)
        .select();

      console.log(data);

      if (error) {
        console.error("Error updating user:", error);
      }
    }
  
  
  handleSubscriptionCancelled()

  }
