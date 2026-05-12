export class BackendUnavailableError extends Error {
  constructor(message = "当前公网页面没有连接 spark 后端，或缺少授权令牌。") {
    super(message);
    this.name = "BackendUnavailableError";
    this.backendUnavailable = true;
  }
}

const DEFAULT_PUBLIC_API_BASE = "https://everyday-recommendations-constitute-subjective.trycloudflare.com";

export function isBackendUnavailableError(error) {
  return Boolean(error?.backendUnavailable || error?.name === "BackendUnavailableError");
}

export async function apiGetJson(path) {
  const url = resolveApiUrl(path);
  const response = await fetchJson(url, apiFetchOptions());
  return parseJsonResponse(response, path);
}

export async function apiPostJson(path, payload) {
  const url = resolveApiUrl(path);
  const response = await fetchJson(url, apiFetchOptions({
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }));
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
  const params = connectionParams();
  const queryBase = params.get("api_base") || params.get("api");
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
  return isPublicFrontend() ? DEFAULT_PUBLIC_API_BASE : "";
}

export function apiToken() {
  if (typeof window === "undefined") return "";
  const params = connectionParams();
  const token = params.get("api_token") || params.get("token");
  if (token) {
    try {
      window.localStorage.setItem("internal_quant_platform.api_token", token);
    } catch (_error) {}
    return token;
  }
  try {
    return window.localStorage.getItem("internal_quant_platform.api_token") || "";
  } catch (_error) {
    return "";
  }
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
    if (response.status === 401) {
      throw new BackendUnavailableError("公网前端已经找到 spark 后端，但缺少或使用了错误的授权令牌。请使用带 api_token 的访问链接。");
    }
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

function apiFetchOptions(options = {}) {
  const headers = new Headers(options.headers || {});
  const token = apiToken();
  if (token) headers.set("X-Fin-Quant-Token", token);
  return {
    ...options,
    headers,
  };
}

function connectionParams() {
  const search = new URLSearchParams(window.location.search || "");
  const hashText = String(window.location.hash || "").replace(/^#/, "");
  const hash = new URLSearchParams(hashText);
  return {
    get(name) {
      return hash.get(name) || search.get(name);
    },
  };
}

function normalizeApiBase(value) {
  return String(value || "").trim().replace(/\/+$/, "");
}
