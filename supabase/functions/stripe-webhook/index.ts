import type Stripe from "stripe";
import { applyStripeEvent } from "../_shared/billing.ts";
import { requireEnv } from "../_shared/config.ts";
import { AppError } from "../_shared/errors.ts";
import {
  handleError,
  jsonResponse,
  requestId,
  requirePost,
} from "../_shared/http.ts";
import { createServiceClient } from "../_shared/supabase.ts";
import { createStripeClient, stripeCryptoProvider } from "../_shared/stripe.ts";

const MAX_WEBHOOK_BYTES = 1_048_576;

async function sha256(value: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value),
  );
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

Deno.serve(async (request) => {
  const id = requestId(request);
  let eventId: string | null = null;

  try {
    requirePost(request);
    const contentLength = Number(request.headers.get("content-length") ?? "0");
    if (Number.isFinite(contentLength) && contentLength > MAX_WEBHOOK_BYTES) {
      throw new AppError(
        413,
        "webhook_too_large",
        "The webhook payload is too large.",
      );
    }

    const signature = request.headers.get("stripe-signature");
    if (!signature) {
      throw new AppError(
        400,
        "missing_stripe_signature",
        "Stripe-Signature is required.",
      );
    }
    const payload = await request.text();
    if (new TextEncoder().encode(payload).byteLength > MAX_WEBHOOK_BYTES) {
      throw new AppError(
        413,
        "webhook_too_large",
        "The webhook payload is too large.",
      );
    }

    const stripe = createStripeClient();
    const webhookSecret = requireEnv("STRIPE_WEBHOOK_SECRET");
    let event: Stripe.Event;
    try {
      event = await stripe.webhooks.constructEventAsync(
        payload,
        signature,
        webhookSecret,
        undefined,
        stripeCryptoProvider(),
      );
    } catch {
      throw new AppError(
        400,
        "invalid_stripe_signature",
        "Stripe webhook signature verification failed.",
      );
    }
    eventId = event.id;

    const service = createServiceClient();
    const { data: claim, error: claimError } = await service.rpc(
      "platform_claim_webhook_event",
      {
        p_provider: "stripe",
        p_event_id: event.id,
        p_event_type: event.type,
        p_payload_sha256: await sha256(payload),
      },
    );
    if (claimError) throw claimError;
    if (claim === "hash_mismatch") {
      throw new AppError(
        409,
        "webhook_id_conflict",
        "Webhook event identity does not match its first delivery.",
      );
    }
    if (claim === "processed") {
      return jsonResponse(
        { received: true, duplicate: true, request_id: id },
        200,
      );
    }
    if (claim === "processing") {
      throw new AppError(
        409,
        "webhook_processing",
        "This event is already being processed; retry later.",
      );
    }
    if (claim !== "claimed") {
      throw new Error("Webhook claim returned an unknown state.");
    }

    try {
      await applyStripeEvent(service, event);
    } catch (processingError) {
      const message =
        processingError instanceof Error
          ? processingError.message
          : "unknown_error";
      const { error: failError } = await service.rpc(
        "platform_fail_webhook_event",
        {
          p_provider: "stripe",
          p_event_id: event.id,
          p_error: message,
        },
      );
      if (failError) {
        console.error(
          JSON.stringify({
            request_id: id,
            code: "webhook_fail_record_error",
            failError,
          }),
        );
      }
      throw processingError;
    }

    return jsonResponse({ received: true, request_id: id }, 200);
  } catch (error) {
    if (eventId) {
      console.error(
        JSON.stringify({
          request_id: id,
          event_id: eventId,
          code: "webhook_error",
        }),
      );
    }
    return handleError(error, id, null);
  }
});
