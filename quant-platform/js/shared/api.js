export class BackendUnavailableError extends Error {
  constructor(message = "当前公网页面没有连接 spark 后端。") {
    super(message);
    this.name = "BackendUnavailableError";
    this.backendUnavailable = true;
  }
}

export function isBackendUnavailableError(error) {
  return Boolean(error?.backendUnavailable || error?.name === "BackendUnavailableError");
}

export async function apiGetJson(path) {
  const response = await fetch(path);
  return parseJsonResponse(response, path);
}

export async function apiPostJson(path, payload) {
  const response = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseJsonResponse(response, path);
}

export async function parseJsonResponse(response, path = "") {
  const contentType = response.headers.get("content-type") || "";
  const text = await response.text();
  const trimmed = text.trim();
  const looksLikeHtml = trimmed.startsWith("<!doctype") || trimmed.startsWith("<html") || contentType.includes("text/html");
  if (looksLikeHtml) {
    throw new BackendUnavailableError(
      "当前公网静态网页没有连接 spark 后端，动态选股、完整回测和模拟交易 API 暂时不可用；请使用 SSH 转发后的 http://127.0.0.1:8788/ 入口。"
    );
  }
  let payload = {};
  if (trimmed) {
    try {
      payload = JSON.parse(trimmed);
    } catch (_error) {
      throw new Error(`接口返回内容不是有效 JSON：${path || response.url || "未知接口"}`);
    }
  }
  if (!response.ok) {
    throw new Error(payload.error || `request failed: ${response.status}`);
  }
  return payload;
}
