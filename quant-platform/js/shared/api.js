export class BackendUnavailableError extends Error {
  constructor(message = "当前公网页面没有连接 spark 后端，或缺少授权令牌。") {
    super(message);
    this.name = "BackendUnavailableError";
    this.backendUnavailable = true;
  }
}

const DEFAULT_PUBLIC_API_BASE = "https://everyday-recommendations-constitute-subjective.trycloudflare.com";
let authPromptPromise = null;

export function isBackendUnavailableError(error) {
  return Boolean(error?.backendUnavailable || error?.name === "BackendUnavailableError");
}

export async function apiGetJson(path) {
  return requestJson(path);
}

export async function apiPostJson(path, payload) {
  return requestJson(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

async function requestJson(path, options = {}, retried = false) {
  if (shouldPromptBeforeRequest(path)) await promptApiConnection();
  const url = resolveApiUrl(path);
  try {
    const response = await fetchJson(url, apiFetchOptions(options));
    return await parseJsonResponse(response, path);
  } catch (error) {
    if (isPublicFrontend() && isBackendUnavailableError(error) && !retried) {
      await promptApiConnection(error.message || "连接 spark 后端失败，请重新输入后端地址和访问令牌。", { force: true });
      return requestJson(path, options, true);
    }
    throw error;
  }
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
      removeSensitiveConnectionParams();
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

export function clearApiCredentials() {
  try {
    window.localStorage.removeItem("internal_quant_platform.api_token");
    window.localStorage.removeItem("internal_quant_platform.api_base");
  } catch (_error) {}
}

export async function parseJsonResponse(response, path = "") {
  const contentType = response.headers.get("content-type") || "";
  const text = await response.text();
  const trimmed = text.trim();
  const looksLikeHtml = trimmed.startsWith("<!doctype") || trimmed.startsWith("<html") || contentType.includes("text/html");
  if (looksLikeHtml) {
    throw new BackendUnavailableError(
      "当前公网页面没有连接到 spark 后端 API。请确认后端地址和访问令牌。"
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
      throw new BackendUnavailableError("公网前端已经找到 spark 后端，但访问令牌缺失或不正确。请重新输入访问令牌。");
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
      `无法连接 spark 后端 ${base}。请确认后端服务和 HTTPS 隧道已启动，再重新连接。原始错误：${error?.message || error}`
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

function shouldPromptBeforeRequest(path) {
  return isPublicFrontend() && String(path || "").startsWith("/api/") && !apiToken();
}

function promptApiConnection(message = "请输入访问令牌，连接 spark 本地量化后端。", { force = false } = {}) {
  if (!isPublicFrontend()) return Promise.resolve();
  if (!force && apiToken()) return Promise.resolve();
  if (authPromptPromise) return authPromptPromise;
  authPromptPromise = new Promise((resolve, reject) => {
    const overlay = document.createElement("div");
    overlay.className = "api-auth-overlay";
    overlay.innerHTML = `
      <form class="api-auth-card" autocomplete="off">
        <div>
          <p class="api-auth-eyebrow">Internal Quant Platform</p>
          <h2>连接 spark 后端</h2>
          <p class="api-auth-message"></p>
        </div>
        <label>
          <span>后端地址</span>
          <input name="api_base" spellcheck="false" inputmode="url" />
        </label>
        <label>
          <span>访问令牌</span>
          <input name="api_token" type="password" autocomplete="current-password" />
        </label>
        <p class="api-auth-note">令牌只保存在这台电脑的浏览器本地，不写入 GitHub，也不会随页面请求发送给 GitHub Pages。</p>
        <div class="api-auth-actions">
          <button class="secondary" type="button" data-auth-cancel>稍后再说</button>
          <button type="submit">保存并连接</button>
        </div>
      </form>`;
    const form = overlay.querySelector("form");
    const baseInput = overlay.querySelector("input[name='api_base']");
    const tokenInput = overlay.querySelector("input[name='api_token']");
    const messageNode = overlay.querySelector(".api-auth-message");
    baseInput.value = apiBaseUrl() || DEFAULT_PUBLIC_API_BASE;
    tokenInput.value = apiToken();
    messageNode.textContent = message;
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const base = normalizeApiBase(baseInput.value || DEFAULT_PUBLIC_API_BASE);
      const token = String(tokenInput.value || "").trim();
      if (!token) {
        messageNode.textContent = "请输入访问令牌。";
        tokenInput.focus();
        return;
      }
      try {
        window.localStorage.setItem("internal_quant_platform.api_base", base);
        window.localStorage.setItem("internal_quant_platform.api_token", token);
      } catch (_error) {}
      close();
      resolve();
    });
    overlay.querySelector("[data-auth-cancel]")?.addEventListener("click", () => {
      close();
      reject(new BackendUnavailableError("尚未输入访问令牌，公网前端只能显示静态壳。"));
    });
    function close() {
      overlay.remove();
      authPromptPromise = null;
    }
    document.body.appendChild(overlay);
    window.setTimeout(() => tokenInput.focus(), 40);
  });
  return authPromptPromise;
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

function removeSensitiveConnectionParams() {
  const query = new URLSearchParams(window.location.search || "");
  const hash = new URLSearchParams(String(window.location.hash || "").replace(/^#/, ""));
  let changed = false;
  for (const params of [query, hash]) {
    for (const key of ["api_token", "token"]) {
      if (params.has(key)) {
        params.delete(key);
        changed = true;
      }
    }
  }
  if (!changed) return;
  const nextSearch = query.toString();
  const nextHash = hash.toString();
  const nextUrl = `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ""}${nextHash ? `#${nextHash}` : ""}`;
  window.history.replaceState(null, "", nextUrl);
}
