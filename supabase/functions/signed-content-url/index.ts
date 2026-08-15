import { validatedOrigin } from "../_shared/cors.ts";
import { signedUrlTtlSeconds } from "../_shared/config.ts";
import { AppError } from "../_shared/errors.ts";
import {
  emptyResponse,
  handleError,
  jsonResponse,
  readJson,
  requestId,
  requirePost,
} from "../_shared/http.ts";
import { authContext, createServiceClient } from "../_shared/supabase.ts";

type SignedUrlRequest = { asset_id?: unknown };
const UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

Deno.serve(async (request) => {
  const id = requestId(request);
  let origin: string | null = null;

  try {
    origin = validatedOrigin(request);
    if (request.method === "OPTIONS") return emptyResponse(204, origin);
    requirePost(request);

    const body = await readJson<SignedUrlRequest>(request);
    const assetId = typeof body.asset_id === "string" ? body.asset_id : "";
    if (!UUID.test(assetId)) {
      throw new AppError(400, "invalid_asset_id", "Provide a valid asset_id.");
    }

    const scoped = await authContext(request);
    const { data: asset, error: assetError } = await scoped.client
      .from("content_assets")
      .select("id, bucket_id, object_path, mime_type, byte_size")
      .eq("id", assetId)
      .maybeSingle();
    if (assetError) throw assetError;
    if (!asset) {
      throw new AppError(
        404,
        "asset_not_found",
        "The asset is unavailable or access is not permitted.",
      );
    }

    const ttl = signedUrlTtlSeconds();
    const service = createServiceClient();
    const { data: signed, error: signedError } = await service.storage
      .from(asset.bucket_id)
      .createSignedUrl(asset.object_path, ttl);
    if (signedError || !signed?.signedUrl) {
      throw signedError ?? new Error("Signed URL was not created.");
    }

    return jsonResponse(
      {
        signed_url: signed.signedUrl,
        expires_in: ttl,
        mime_type: asset.mime_type,
        byte_size: asset.byte_size,
        request_id: id,
      },
      200,
      origin,
    );
  } catch (error) {
    return handleError(error, id, origin);
  }
});
