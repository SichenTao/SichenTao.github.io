import type { SupabaseClient } from "@supabase/supabase-js";
import type Stripe from "stripe";
import { unixTimestampToIso } from "./stripe.ts";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

type SubscriptionContext = {
  userId: string;
  applicationId: string;
  customerId: string;
  priceId: string;
};

function objectId(value: string | { id: string } | null): string | null {
  if (typeof value === "string") return value;
  return value?.id ?? null;
}

async function resolveSubscriptionContext(
  service: SupabaseClient,
  subscription: Stripe.Subscription,
): Promise<SubscriptionContext> {
  const customerId = objectId(subscription.customer);
  if (subscription.items.data.length !== 1) {
    throw new Error(
      "Platform subscriptions must contain exactly one Stripe Price.",
    );
  }
  const priceId = subscription.items.data[0]?.price?.id ?? null;
  if (!customerId || !priceId) {
    throw new Error("Stripe subscription lacks customer or price identifiers.");
  }

  let userId = subscription.metadata.platform_user_id ?? "";
  let applicationId = subscription.metadata.platform_application_id ?? "";

  if (!UUID_PATTERN.test(userId) || !UUID_PATTERN.test(applicationId)) {
    const { data: customer, error: customerError } = await service
      .from("billing_customers")
      .select("user_id, application_id")
      .eq("provider", "stripe")
      .eq("provider_customer_id", customerId)
      .maybeSingle();
    if (customerError) throw customerError;
    userId = customer?.user_id ?? "";
    applicationId = customer?.application_id ?? "";
  }

  if (!UUID_PATTERN.test(userId) || !UUID_PATTERN.test(applicationId)) {
    throw new Error(
      "Stripe subscription cannot be mapped to a platform user and application.",
    );
  }

  const { data: plan, error: planError } = await service
    .from("plans")
    .select("application_id")
    .eq("provider_price_id", priceId)
    .maybeSingle();
  if (planError) throw planError;
  if (!plan || plan.application_id !== applicationId) {
    throw new Error(
      "Stripe price does not belong to the mapped platform application.",
    );
  }

  return { userId, applicationId, customerId, priceId };
}

async function completeEvent(
  service: SupabaseClient,
  eventId: string,
  action: string,
): Promise<void> {
  const { error } = await service.rpc("platform_complete_webhook_event", {
    p_provider: "stripe",
    p_event_id: eventId,
    p_action: action,
  });
  if (error) throw error;
}

async function synchronizeSubscription(
  service: SupabaseClient,
  event: Stripe.Event,
): Promise<void> {
  const subscription = event.data.object as Stripe.Subscription;
  const context = await resolveSubscriptionContext(service, subscription);
  const subscriptionItem = subscription.items.data[0];
  if (!subscriptionItem) {
    throw new Error("Stripe subscription has no subscription item.");
  }
  const { error } = await service.rpc(
    "platform_apply_stripe_subscription_event",
    {
      p_event_id: event.id,
      p_user_id: context.userId,
      p_application_id: context.applicationId,
      p_stripe_customer_id: context.customerId,
      p_stripe_subscription_id: subscription.id,
      p_stripe_price_id: context.priceId,
      p_status: subscription.status,
      p_event_created_at: unixTimestampToIso(event.created),
      p_current_period_start: unixTimestampToIso(
        subscriptionItem.current_period_start,
      ),
      p_current_period_end: unixTimestampToIso(
        subscriptionItem.current_period_end,
      ),
      p_cancel_at_period_end: subscription.cancel_at_period_end,
      p_trial_end: unixTimestampToIso(subscription.trial_end),
    },
  );
  if (error) throw error;
}

export async function applyStripeEvent(
  service: SupabaseClient,
  event: Stripe.Event,
): Promise<void> {
  switch (event.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
    case "customer.subscription.paused":
    case "customer.subscription.resumed":
      await synchronizeSubscription(service, event);
      return;
    case "checkout.session.completed":
      await completeEvent(service, event.id, "billing.checkout_completed");
      return;
    case "invoice.paid":
      await completeEvent(service, event.id, "billing.invoice_paid");
      return;
    case "invoice.payment_failed":
      await completeEvent(service, event.id, "billing.invoice_payment_failed");
      return;
    default:
      await completeEvent(service, event.id, "billing.webhook_ignored");
  }
}
