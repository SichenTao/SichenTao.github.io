import { corsHeaders } from "./cors.ts";
import { AppError } from "./errors.ts";

const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
};

export function requestId(request: Request): string {
  const supplied = request.headers.get("x-request-id")?.trim();
  if (supplied && /^[A-Za-z0-9._:-]{8,128}$/.test(supplied)) return supplied;
  return crypto.randomUUID();
}

export function jsonResponse(
  body: unknown,
  status = 200,
  origin: string | null = null,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...JSON_HEADERS, ...corsHeaders(origin) },
  });
}

export function emptyResponse(status: number, origin: string | null): Response {
  return new Response(null, { status, headers: corsHeaders(origin) });
}

export async function readJson<T>(
  request: Request,
  maxBytes = 65_536,
): Promise<T> {
  const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";
  if (!contentType.startsWith("application/json")) {
    throw new AppError(
      415,
      "unsupported_media_type",
      "Content-Type must be application/json.",
    );
  }
  const text = await request.text();
  if (new TextEncoder().encode(text).byteLength > maxBytes) {
    throw new AppError(
      413,
      "request_too_large",
      "The request body is too large.",
    );
  }
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new AppError(
      400,
      "invalid_json",
      "The request body is not valid JSON.",
    );
  }
}

export function requirePost(request: Request): void {
  if (request.method !== "POST") {
    throw new AppError(
      405,
      "method_not_allowed",
      "Use POST for this endpoint.",
    );
  }
}

export function safeReturnUrl(
  base: URL,
  relativePath: unknown,
  fallbackPath: string,
): string {
  const path =
    typeof relativePath === "string" && relativePath.startsWith("/")
      ? relativePath
      : fallbackPath;
  if (path.startsWith("//") || path.includes("\\") || /[\r\n]/.test(path)) {
    throw new AppError(
      400,
      "invalid_return_path",
      "Return path must be a local absolute path.",
    );
  }
  const result = new URL(path, base);
  if (result.origin !== base.origin) {
    throw new AppError(
      400,
      "invalid_return_path",
      "Return path must stay on the configured application origin.",
    );
  }
  return result.toString();
}

export function handleError(
  error: unknown,
  id: string,
  origin: string | null,
): Response {
  if (error instanceof AppError) {
    if (!error.expose) {
      console.error(
        JSON.stringify({ request_id: id, code: error.code, error }),
      );
    }
    return jsonResponse(
      {
        error: {
          code: error.code,
          message: error.expose
            ? error.message
            : "The server could not complete the request.",
          request_id: id,
        },
      },
      error.status,
      origin,
    );
  }

  console.error(
    JSON.stringify({ request_id: id, code: "internal_error", error }),
  );
  return jsonResponse(
    {
      error: {
        code: "internal_error",
        message: "The server could not complete the request.",
        request_id: id,
      },
    },
    500,
    origin,
  );
}
