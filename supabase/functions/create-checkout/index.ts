import { validatedOrigin } from "../_shared/cors.ts";
import { requireHttpUrl } from "../_shared/config.ts";
import { AppError } from "../_shared/errors.ts";
import {
  emptyResponse,
  handleError,
  jsonResponse,
  readJson,
  requestId,
  requirePost,
  safeReturnUrl,
} from "../_shared/http.ts";
import { createServiceClient, requireUser } from "../_shared/supabase.ts";
import { createStripeClient } from "../_shared/stripe.ts";

type CheckoutRequest = {
  application_slug?: unknown;
  plan_key?: unknown;
  request_id?: unknown;
  success_path?: unknown;
  cancel_path?: unknown;
};

const IDENTIFIER = /^[a-z0-9]+(?:[-_][a-z0-9]+)*$/;
const REQUEST_KEY = /^[A-Za-z0-9_-]{16,128}$/;

Deno.serve(async (request) => {
  const id = requestId(request);
  let origin: string | null = null;

  try {
    origin = validatedOrigin(request);
    if (request.method === "OPTIONS") return emptyResponse(204, origin);
    requirePost(request);

    const { user } = await requireUser(request);
    const body = await readJson<CheckoutRequest>(request);
    const applicationSlug =
      typeof body.application_slug === "string" ? body.application_slug : "";
    const planKey = typeof body.plan_key === "string" ? body.plan_key : "";
    const checkoutRequestId =
      typeof body.request_id === "string" ? body.request_id : "";
    if (
      !IDENTIFIER.test(applicationSlug) ||
      !IDENTIFIER.test(planKey) ||
      !REQUEST_KEY.test(checkoutRequestId)
    ) {
      throw new AppError(
        400,
        "invalid_checkout_request",
        "Provide a valid application_slug, plan_key, and unique request_id.",
      );
    }

    const service = createServiceClient();
    const { data: application, error: applicationError } = await service
      .from("applications")
      .select("id, slug, status")
      .eq("slug", applicationSlug)
      .eq("status", "active")
      .maybeSingle();
    if (applicationError) throw applicationError;
    if (!application) {
      throw new AppError(
        404,
        "application_not_found",
        "The application is unavailable.",
      );
    }

    const { data: plan, error: planError } = await service
      .from("plans")
      .select("id, plan_key, provider_price_id, unit_amount, active")
      .eq("application_id", application.id)
      .eq("plan_key", planKey)
      .eq("active", true)
      .maybeSingle();
    if (planError) throw planError;
    if (!plan) {
      throw new AppError(
        404,
        "plan_not_found",
        "The requested plan is unavailable.",
      );
    }
    if (!plan.provider_price_id || plan.unit_amount <= 0) {
      throw new AppError(
        409,
        "plan_not_checkout_ready",
        "This paid plan has no active Stripe Price configuration.",
      );
    }

    const stripe = createStripeClient();
    const customerLookup = await service
      .from("billing_customers")
      .select("id, provider_customer_id")
      .eq("application_id", application.id)
      .eq("user_id", user.id)
      .eq("provider", "stripe")
      .maybeSingle();
    if (customerLookup.error) throw customerLookup.error;
    let billingCustomer = customerLookup.data;

    if (!billingCustomer) {
      const stripeCustomer = await stripe.customers.create(
        {
          ...(user.email ? { email: user.email } : {}),
          metadata: {
            platform_user_id: user.id,
            platform_application_id: application.id,
            platform_application_slug: application.slug,
          },
        },
        {
          idempotencyKey: `platform-customer:${application.id}:${user.id}`,
        },
      );

      const { data: savedCustomer, error: saveCustomerError } = await service
        .from("billing_customers")
        .upsert(
          {
            application_id: application.id,
            user_id: user.id,
            provider: "stripe",
            provider_customer_id: stripeCustomer.id,
          },
          { onConflict: "application_id,user_id,provider" },
        )
        .select("id, provider_customer_id")
        .single();
      if (saveCustomerError) throw saveCustomerError;
      billingCustomer = savedCustomer;
    }

    const { error: membershipError } = await service.rpc(
      "platform_ensure_membership",
      {
        p_application_id: application.id,
        p_user_id: user.id,
      },
    );
    if (membershipError) throw membershipError;

    const appBaseUrl = requireHttpUrl("PUBLIC_APP_URL");
    const successUrl = new URL(
      safeReturnUrl(appBaseUrl, body.success_path, "/account/"),
    );
    successUrl.searchParams.set("checkout", "success");
    const successWithSession = `${successUrl.toString()}&session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = new URL(
      safeReturnUrl(appBaseUrl, body.cancel_path, "/account/"),
    );
    cancelUrl.searchParams.set("checkout", "canceled");

    const session = await stripe.checkout.sessions.create(
      {
        mode: "subscription",
        customer: billingCustomer.provider_customer_id,
        line_items: [{ price: plan.provider_price_id, quantity: 1 }],
        success_url: successWithSession,
        cancel_url: cancelUrl.toString(),
        allow_promotion_codes: true,
        client_reference_id: user.id,
        metadata: {
          platform_user_id: user.id,
          platform_application_id: application.id,
          platform_plan_id: plan.id,
          platform_plan_key: plan.plan_key,
        },
        subscription_data: {
          metadata: {
            platform_user_id: user.id,
            platform_application_id: application.id,
            platform_plan_id: plan.id,
            platform_plan_key: plan.plan_key,
          },
        },
      },
      {
        idempotencyKey: `checkout:${user.id}:${checkoutRequestId}`,
      },
    );

    if (!session.url) throw new Error("Stripe did not return a Checkout URL.");
    await service.from("audit_events").insert({
      application_id: application.id,
      actor_user_id: user.id,
      actor_type: "user",
      action: "billing.checkout_created",
      subject_type: "checkout_session",
      subject_id: session.id,
      request_id: id,
      details: { plan_key: plan.plan_key },
    });

    return jsonResponse(
      {
        checkout_url: session.url,
        expires_at: session.expires_at,
        request_id: id,
      },
      200,
      origin,
    );
  } catch (error) {
    return handleError(error, id, origin);
  }
});
