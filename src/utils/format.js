export const today = new Date().toISOString().slice(0, 10);

export const currentMonth = today.slice(0, 7);

export function formatNumber(number) {
  return Number(number || 0).toLocaleString("vi-VN", {
    maximumFractionDigits: 2,
  });
}
export function formatInputNumber(value) {
  const rawValue = String(value ?? "").replace(/[^\d]/g, "");

  if (!rawValue) {
    return "";
  }

  return Number(rawValue).toLocaleString("en-US");
}

export function removeNumberFormat(value) {
  return String(value ?? "").replace(/[^\d]/g, "");
}
