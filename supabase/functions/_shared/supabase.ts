import {
  createClient,
  type SupabaseClient,
  type User,
} from "@supabase/supabase-js";
import { requireEnv, requirePublicSupabaseKey } from "./config.ts";
import { AppError } from "./errors.ts";

export type AuthContext = {
  client: SupabaseClient;
  token: string | null;
  user: User | null;
};

function bearerToken(request: Request): string | null {
  const header = request.headers.get("authorization")?.trim() ?? "";
  const match = /^Bearer\s+([^\s]+)$/i.exec(header);
  return match?.[1] ?? null;
}

export function createServiceClient(): SupabaseClient {
  return createClient(
    requireEnv("SUPABASE_URL"),
    requireEnv("SUPABASE_SERVICE_ROLE_KEY"),
    {
      auth: { persistSession: false, autoRefreshToken: false },
    },
  );
}

export async function authContext(request: Request): Promise<AuthContext> {
  const token = bearerToken(request);
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;

  const client = createClient(
    requireEnv("SUPABASE_URL"),
    requirePublicSupabaseKey(),
    {
      global: { headers },
      auth: { persistSession: false, autoRefreshToken: false },
    },
  );

  if (!token) return { client, token: null, user: null };

  const { data, error } = await client.auth.getUser(token);
  if (error || !data.user) {
    throw new AppError(
      401,
      "invalid_access_token",
      "The access token is invalid or expired.",
    );
  }
  return { client, token, user: data.user };
}

export async function requireUser(
  request: Request,
): Promise<AuthContext & { user: User }> {
  const context = await authContext(request);
  if (!context.user) {
    throw new AppError(
      401,
      "authentication_required",
      "Sign in before using this endpoint.",
    );
  }
  return context as AuthContext & { user: User };
}
