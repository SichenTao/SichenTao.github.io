import { allowedWebOrigins } from "./config.ts";
import { AppError } from "./errors.ts";

export function validatedOrigin(request: Request): string | null {
  const raw = request.headers.get("origin");
  if (!raw) return null;

  let origin: string;
  try {
    origin = new URL(raw).origin;
  } catch {
    throw new AppError(
      403,
      "origin_not_allowed",
      "The request origin is not allowed.",
    );
  }

  if (!allowedWebOrigins().has(origin)) {
    throw new AppError(
      403,
      "origin_not_allowed",
      "The request origin is not allowed.",
    );
  }
  return origin;
}

export function corsHeaders(origin: string | null): Record<string, string> {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Headers":
      "authorization, apikey, content-type, idempotency-key, x-client-info",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
  if (origin) headers["Access-Control-Allow-Origin"] = origin;
  return headers;
}
