import { ConfigurationError } from "./errors.ts";

export function requireEnv(name: string): string {
  const value = Deno.env.get(name)?.trim();
  if (!value) {
    throw new ConfigurationError(
      `Required server configuration is missing: ${name}.`,
    );
  }
  return value;
}

export function optionalEnv(name: string): string | undefined {
  return Deno.env.get(name)?.trim() || undefined;
}

export function requirePublicSupabaseKey(): string {
  return (
    optionalEnv("SUPABASE_PUBLISHABLE_KEY") ?? requireEnv("SUPABASE_ANON_KEY")
  );
}

export function requireHttpUrl(name: string): URL {
  const raw = requireEnv(name);
  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      throw new Error("invalid protocol");
    }
    return parsed;
  } catch {
    throw new ConfigurationError(`${name} must be an absolute HTTP(S) URL.`);
  }
}

export function allowedWebOrigins(): ReadonlySet<string> {
  const origins = new Set<string>();
  const configured = optionalEnv("ALLOWED_WEB_ORIGINS") ?? "";
  for (const raw of configured.split(",")) {
    const candidate = raw.trim();
    if (!candidate) continue;
    try {
      origins.add(new URL(candidate).origin);
    } catch {
      throw new ConfigurationError(
        "ALLOWED_WEB_ORIGINS contains an invalid URL.",
      );
    }
  }

  const appUrl = optionalEnv("PUBLIC_APP_URL");
  if (appUrl) {
    try {
      origins.add(new URL(appUrl).origin);
    } catch {
      throw new ConfigurationError("PUBLIC_APP_URL must be an absolute URL.");
    }
  }

  if (origins.size === 0) {
    throw new ConfigurationError(
      "Configure PUBLIC_APP_URL or ALLOWED_WEB_ORIGINS.",
    );
  }
  return origins;
}

export function signedUrlTtlSeconds(): number {
  const raw = optionalEnv("SIGNED_URL_TTL_SECONDS") ?? "300";
  const value = Number(raw);
  if (!Number.isInteger(value) || value < 60 || value > 900) {
    throw new ConfigurationError(
      "SIGNED_URL_TTL_SECONDS must be an integer from 60 to 900.",
    );
  }
  return value;
}
