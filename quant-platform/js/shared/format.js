export function formatNumber(value) {
  return Number(value || 0).toLocaleString("zh-CN");
}

export function formatMoney(value) {
  const number = Number(value || 0);
  if (Math.abs(number) >= 100000000) return `${(number / 100000000).toFixed(2)}亿`;
  if (Math.abs(number) >= 10000) return `${(number / 10000).toFixed(2)}万`;
  return number.toFixed(2);
}

export function formatPrice(value) {
  return Number(value || 0).toFixed(2);
}

export function formatSignedPct(value) {
  const number = Number(value || 0);
  return `${number >= 0 ? "+" : ""}${number.toFixed(2)}%`;
}

export function formatReadinessStatus(value) {
  const labels = {
    full_intraday_ready: "5m完整",
    selected_intraday_ready: "选股可回放",
    partial_intraday_ready: "日线完整",
    daily_ready: "日线完整",
    blocked: "受阻",
  };
  return labels[String(value || "")] || "日线完整";
}

export function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function roundLot(value) {
  return Math.floor(Number(value || 0) / 100) * 100;
}
