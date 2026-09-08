import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { supabaseAdmin } from "@/middleware";

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
export const config = {
  api: {
    bodyParser: false, // Critical for raw body access
  },
};

async function getRawBody(readable: ReadableStream): Promise<Buffer> {
  const chunks = [];
  const reader = readable.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  return Buffer.concat(chunks);
}
export async function POST(request: NextRequest) {
  try {
    const rawBody = await getRawBody(request.body!);
    const textBody = rawBody.toString("utf8");
    const signature = request.headers.get("X-Signature");
    // const body = await request.json();
    // const { meta, data } = body;

    if (!signature) {
      return NextResponse.json(
        { error: "Request has no signature" },
        { status: 401 }
      );
    }

    const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    // 2. Generate HMAC using the exact raw bytes
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(rawBody);
    const digest = hmac.digest("hex");

    // 3. Compare signatures (timing-safe)
    const signatureBuffer = Buffer.from(signature, "utf8");
    const digestBuffer = Buffer.from(digest, "utf8");

    if (!crypto.timingSafeEqual(signatureBuffer, digestBuffer)) {
      console.error("Signature mismatch", {
        received: signature,
        computed: digest,
        bodySample: textBody.substring(0, 100),
      });
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // 4. Only NOW parse the JSON
    const payload = JSON.parse(textBody);
    const { meta, data } = payload;
    console.log("meta: ", meta);
    console.log("data: ", data);
    if (!meta || !data) {
      return NextResponse.json(
        { error: "Invalid webhook payload" },
        { status: 400 }
      );
    }

    const eventName = meta.event_name;
    const handled_events = ['subscription_created', 'subscription_updated', 'subscription_cancelled', 'subscription_payment_success', 'subscription_payment_failed', 'subscription_plan_changed'];

    if (handled_events.includes(eventName)) {
      await handleSubscriptionEvent(eventName, meta, data);
    } else {
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

// async function handleSubscriptionCreated(meta: WebhookMeta, data: WebhookData) {
//   const { error } = await supabaseAdmin.rpc("handle_subscription_created", {
//     p_meta: meta,
//     p_data: data,
//   });
 
//   if (error) {
//     console.error("Error handling subscription creation:", error);
//     throw error;
//   }
// }

// async function handleSubscriptionUpdated(meta: WebhookMeta, data: WebhookData) {

//     const { attributes } = data;
    
//     const {error} = await supabaseAdmin
//       .from('subscriptions')
//       .update({
//         status: attributes.status,
//         renews_at: new Date(attributes.renews_at),
//         ends_at: attributes.ends_at ? new Date(attributes.ends_at) : null,
//         updated_at: new Date(),
//         pause: attributes.pause // Store pause details if needed
//       })
//       .eq('id', data.id);

//   if (error) {
//     console.error("Error handling subscription update:", error);
//     throw error;
//   }
// }

// async function handleSubscriptionCancelled(
//   meta: WebhookMeta,
//   data: WebhookData
// ) {
//   const { attributes } = data;

//  const {error} = await supabaseAdmin
//     .from('subscriptions')
//     .update({
//       status: 'cancelled',
//       ends_at: new Date(attributes.ends_at),
//       cancelled_at: new Date(),
//       updated_at: new Date()
//     })
//     .eq('id', data.id);

//   if (error) {
//     console.error("Error handling subscription cancellation:", error);
//     throw error;
//   }
// }

// async function handleSubscriptionPaymentSuccess(
//   meta: WebhookMeta,
//   data: WebhookData
// ) {
//   const { attributes } = data;
  
//   // Insert payment record
//   const { error } = await supabaseAdmin
//     .from('payments')
//     .insert({
//       lemon_payment_id: data.id,
//       subscription_id: meta.custom_data.subscription_id, // Your internal reference
//       amount: attributes.total,
//       currency: attributes.currency,
//       status: 'completed',
//       payment_date: new Date(attributes.created_at),
//       receipt_url: attributes.urls.receipt // If available
//     });

//   if (error) throw new Error(`Payment recording failed: ${error.message}`);

//   // Update subscription
//   await supabaseAdmin
//     .from('subscriptions')
//     .update({
//       last_payment_id: data.id,
//       renews_at: new Date(attributes.renews_at)
//     })
//     .eq('lemon_subscription_id', data.id);
// }

// async function handleSubscriptionPaymentFailed(
//   meta: WebhookMeta,
//   data: WebhookData
// ) {
//   const { attributes } = data;

//   // First record the failed payment
//   const { data: payment, error } = await supabaseAdmin
//     .from('payments')
//     .insert({
//       lemon_payment_id: data.id,
//       subscription_id: meta.custom_data.subscription_id,
//       amount: attributes.total,
//       currency: attributes.currency,
//       status: 'failed',
//       payment_date: new Date()
//     })
//     .select()
//     .single();

//   if (error) throw new Error(`Failed payment recording failed: ${error.message}`);

//   // Then record failure details
//   await supabaseAdmin
//     .from('failed_payments')
//     .insert({
//       payment_id: payment.id,
//       error_code: attributes.last_payment_error?.code || 'unknown',
//       next_retry_at: attributes.renews_at ? new Date(attributes.renews_at) : null
//     });
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

// async function handleSubscriptionUpdated(meta: WebhookMeta, data: WebhookData) {
//   const { attributes } = data;
  
//   // Update subscription
//   const { error: subError } = await supabaseAdmin
//     .from('subscriptions')
//     .update({
//       status: attributes.status,
//       renews_at: new Date(attributes.renews_at),
//       ends_at: attributes.ends_at ? new Date(attributes.ends_at) : null,
//       updated_at: new Date(),
//       pause: attributes.pause,
//       card_brand: attributes.card_brand,
//       card_last_four: attributes.card_last_four
//     })
//     .eq('id', data.id);

//   if (subError) throw new Error(`Subscription update failed: ${subError.message}`);

//   // Update user premium status if subscription ends
//   if (attributes.ends_at && new Date(attributes.ends_at) <= new Date()) {
//     await supabaseAdmin
//       .from('users')
//       .update({ 
//         is_premium: false,
//         payment_method_expired: false 
//       })
//       .eq('id', meta.custom_data.user_id);
//   }

//   // Audit log
//   await supabaseAdmin
//     .from('subscription_audit_logs')
//     .insert({
//       event_type: 'updated',
//       subscription_id: data.id,
//       user_id: meta.custom_data.user_id,
//       old_status: null, // Can query previous status if needed
//       new_status: attributes.status,
//       metadata: { attributes }
//     });
// }

// async function handleSubscriptionCancelled(meta: WebhookMeta, data: WebhookData) {
//   const { attributes } = data;

//   // Update subscription
//   const { error: subError } = await supabaseAdmin
//     .from('subscriptions')
//     .update({
//       status: 'cancelled',
//       ends_at: new Date(attributes.ends_at),
//       cancelled_at: new Date(),
//       updated_at: new Date()
//     })
//     .eq('id', data.id);

//   if (subError) throw new Error(`Subscription cancellation failed: ${subError.message}`);

//   // Downgrade user
//   await supabaseAdmin
//     .from('users')
//     .update({ 
//       is_premium: attributes.ends_at ? new Date(attributes.ends_at) > new Date() : false,
//       payment_method_expired: false 
//     })
//     .eq('id', meta.custom_data.user_id);

//   // Audit log
//   await supabaseAdmin
//     .from('subscription_audit_logs')
//     .insert({
//       event_type: 'cancelled',
//       subscription_id: data.id,
//       user_id: meta.custom_data.user_id,
//       metadata: { ends_at: attributes.ends_at }
//     });
// }

// async function handleSubscriptionPaymentSuccess(meta: WebhookMeta, data: WebhookData) {
//   const { attributes } = data;
  
//   // Insert payment record
//   const { data: payment, error: paymentError } = await supabaseAdmin
//     .from('payments')
//     .insert({
//       lemon_payment_id: data.id,
//       subscription_id: data.id,
//       user_id: meta.custom_data.user_id,
//       amount: attributes.total,
//       currency: attributes.currency,
//       status: 'completed',
//       payment_date: new Date(attributes.created_at),
//       card_brand: attributes.card_brand,
//       card_last_four: attributes.card_last_four,
//       receipt_url: attributes.urls?.receipt
//     })
//     .select()
//     .single();

//   if (paymentError) throw new Error(`Payment recording failed: ${paymentError.message}`);

//   // Update subscription
//   const { error: subError } = await supabaseAdmin
//     .from('subscriptions')
//     .update({
//       last_payment_id: payment.id,
//       renews_at: new Date(attributes.renews_at),
//       payment_failed_attempts: 0, // Reset failure counter
//       status: 'active',
//       updated_at: new Date()
//     })
//     .eq('id', data.id);

//   if (subError) throw new Error(`Subscription update failed: ${subError.message}`);

//   // Ensure user is marked as premium
//   await supabaseAdmin
//     .from('users')
//     .update({ 
//       is_premium: true,
//       payment_method_expired: false 
//     })
//     .eq('id', meta.custom_data.user_id);
// }

// async function handleSubscriptionPaymentFailed(meta: WebhookMeta, data: WebhookData) {
//   const { attributes } = data;

//   // Record failed payment
//   const { data: payment, error: paymentError } = await supabaseAdmin
//     .from('payments')
//     .insert({
//       lemon_payment_id: payment.id,
//       subscription_id: payment.id,
//       user_id: meta.custom_data.user_id,
//       amount: attributes.total,
//       currency: attributes.currency,
//       status: 'failed',
//       payment_date: new Date(),
//       card_brand: attributes.card_brand,
//       card_last_four: attributes.card_last_four,
//       error_code: attributes.last_payment_error?.code
//     })
//     .select()
//     .single();

//   if (paymentError) throw new Error(`Failed payment recording failed: ${paymentError.message}`);

//   // Update subscription failure count
//   const { error: subError } = await supabaseAdmin
//     .from('subscriptions')
//     .update({
//       payment_failed_attempts: supabaseAdmin.rpc('increment', {
//         val: 1,
//         column_name: 'payment_failed_attempts'
//       }),
//       status: 'past_due',
//       updated_at: new Date()
//     })
//     .eq('id', data.id);

//   if (subError) throw new Error(`Subscription update failed: ${subError.message}`);

//   // Mark payment method as expired if applicable
//   if (attributes.last_payment_error?.code === 'expired_card') {
//     await supabaseAdmin
//       .from('users')
//       .update({ payment_method_expired: true })
//       .eq('id', meta.custom_data.user_id);
//   }
// }

// async function handleSubscriptionPlanChanged(meta: WebhookMeta, data: WebhookData) {
//   const { attributes } = data;

//   // Get current plan details
//   const { data: currentSub } = await supabaseAdmin
//     .from('subscriptions')
//     .select('product_id, variant_id, price')
//     .eq('id', data.id)
//     .single();

//   // Archive old plan
//   await supabaseAdmin
//     .from('subscription_history')
//     .insert({
//       event_type: 'plan_change',
//       subscription_id: data.id,
//       user_id: meta.custom_data.user_id,
//       old_product_id: currentSub?.product_id,
//       old_variant_id: currentSub?.variant_id,
//       old_price: currentSub?.price,
//       new_product_id: attributes.product_id,
//       new_variant_id: attributes.variant_id,
//       new_price: attributes.price,
//       changed_at: new Date()
//     });

//   // Update to new plan
//   const { error } = await supabaseAdmin
//     .from('subscriptions')
//     .update({
//       product_id: attributes.product_id,
//       variant_id: attributes.variant_id,
//       product_name: attributes.product_name,
//       variant_name: attributes.variant_name,
//       updated_at: new Date()
//     })
//     .eq('id', data.id);

//   if (error) throw new Error(`Plan change failed: ${error.message}`);
// }

// Example handler wrapper

async function handleSubscriptionEvent(
  handlerName: string, 
  meta: WebhookMeta, 
  data: WebhookData
) {
  const { error } = await supabaseAdmin.rpc(`handle_${handlerName}`, {
    p_meta: meta,
    p_data: data
  });
  
  if (error) {
    console.error(`Error handling ${handlerName}:`, error);
    throw error;
  }
}


