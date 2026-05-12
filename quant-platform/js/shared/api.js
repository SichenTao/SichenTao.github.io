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
  const url = resolveApiUrl(path);
  const response = await fetchJson(url);
  return parseJsonResponse(response, path);
}

export async function apiPostJson(path, payload) {
  const url = resolveApiUrl(path);
  const response = await fetchJson(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseJsonResponse(response, path);
}

export function resolveApiUrl(path) {
  const raw = String(path || "");
  if (/^https?:\/\//i.test(raw)) return raw;
  const base = apiBaseUrl();
  if (raw.startsWith("/api/") && base) return `${base}${raw}`;
  return raw;
}

export function apiBaseUrl() {
  if (typeof window === "undefined") return "";
  const query = new URLSearchParams(window.location.search);
  const queryBase = query.get("api_base") || query.get("api");
  if (queryBase) {
    const normalized = normalizeApiBase(queryBase);
    try {
      window.localStorage.setItem("internal_quant_platform.api_base", normalized);
    } catch (_error) {}
    return normalized;
  }
  try {
    const stored = window.localStorage.getItem("internal_quant_platform.api_base");
    if (stored) return normalizeApiBase(stored);
  } catch (_error) {}
  return isPublicFrontend() ? "http://127.0.0.1:8788" : "";
}

export function isPublicFrontend() {
  if (typeof window === "undefined") return false;
  const { hostname, pathname, port } = window.location;
  if (/(^|\.)github\.io$/i.test(hostname || "")) return true;
  if (pathname.startsWith("/quant-platform/") && port !== "8788") return true;
  return false;
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

async function fetchJson(url, options = {}) {
  try {
    return await fetch(url, options);
  } catch (error) {
    const base = apiBaseUrl() || "当前网站同源后端";
    throw new BackendUnavailableError(
      `无法连接本地 spark 后端 ${base}。请确认 SSH 隧道或本地服务已启动，再刷新页面。原始错误：${error?.message || error}`
    );
  }
}

function normalizeApiBase(value) {
  return String(value || "").trim().replace(/\/+$/, "");
}
