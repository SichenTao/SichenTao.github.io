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

type PortalRequest = {
  application_slug?: unknown;
  return_path?: unknown;
};

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

Deno.serve(async (request) => {
  const id = requestId(request);
  let origin: string | null = null;

  try {
    origin = validatedOrigin(request);
    if (request.method === "OPTIONS") return emptyResponse(204, origin);
    requirePost(request);

    const { user } = await requireUser(request);
    const body = await readJson<PortalRequest>(request);
    const applicationSlug =
      typeof body.application_slug === "string" ? body.application_slug : "";
    if (!SLUG.test(applicationSlug)) {
      throw new AppError(
        400,
        "invalid_portal_request",
        "Provide a valid application_slug.",
      );
    }

    const service = createServiceClient();
    const { data: application, error: applicationError } = await service
      .from("applications")
      .select("id")
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

    const { data: customer, error: customerError } = await service
      .from("billing_customers")
      .select("provider_customer_id")
      .eq("application_id", application.id)
      .eq("user_id", user.id)
      .eq("provider", "stripe")
      .maybeSingle();
    if (customerError) throw customerError;
    if (!customer) {
      throw new AppError(
        404,
        "billing_customer_not_found",
        "No billing account exists for this application.",
      );
    }

    const returnUrl = safeReturnUrl(
      requireHttpUrl("PUBLIC_APP_URL"),
      body.return_path,
      "/account/",
    );
    const stripe = createStripeClient();
    const portal = await stripe.billingPortal.sessions.create({
      customer: customer.provider_customer_id,
      return_url: returnUrl,
    });

    await service.from("audit_events").insert({
      application_id: application.id,
      actor_user_id: user.id,
      actor_type: "user",
      action: "billing.portal_created",
      subject_type: "billing_customer",
      subject_id: customer.provider_customer_id,
      request_id: id,
    });

    return jsonResponse(
      { portal_url: portal.url, request_id: id },
      200,
      origin,
    );
  } catch (error) {
    return handleError(error, id, origin);
  }
});
