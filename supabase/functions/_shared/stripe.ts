import Stripe from "stripe";
import { requireEnv } from "./config.ts";

export function createStripeClient(): Stripe {
  return new Stripe(requireEnv("STRIPE_SECRET_KEY"), {
    httpClient: Stripe.createFetchHttpClient(),
    maxNetworkRetries: 2,
  });
}

export function stripeCryptoProvider() {
  return Stripe.createSubtleCryptoProvider();
}

export function unixTimestampToIso(
  value: number | null | undefined,
): string | null {
  if (!value || !Number.isFinite(value) || value < 0) return null;
  return new Date(value * 1000).toISOString();
}
