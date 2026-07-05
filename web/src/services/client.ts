import { API_BASE_URL } from "@/lib/api-config";

const FETCH_TIMEOUT_MS = 10_000;

async function fetchWithTimeout(input: string, init: RequestInit = {}, timeoutMs = FETCH_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(input, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

function buildQueryString(query?: Record<string, string | number | boolean | undefined | null>): string {
  if (!query) return "";
  const entries = Object.entries(query)
    .filter(([_, v]) => v !== "" && v !== undefined && v !== null)
    .map(([k, v]) => [k, String(v)]);
  return entries.length > 0
    ? "?" + new URLSearchParams(Object.fromEntries(entries)).toString()
    : "";
}

export async function fetchJson<T>(path: string, revalidate?: number): Promise<T> {
  const res = await fetchWithTimeout(`${API_BASE_URL}${path}`, {
    ...(revalidate ? { next: { revalidate } } : {}),
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`Failed to fetch ${path}`);
  const data = await res.json();
  return data?.data ?? data;
}

export async function getWithQuery<T>(path: string, query: Record<string, string | number | boolean | undefined | null>, revalidate?: number): Promise<T[]> {
  const queryString = buildQueryString(query);
  const res = await fetchWithTimeout(`${API_BASE_URL}${path}${queryString}`, {
    ...(revalidate ? { next: { revalidate } } : {}),
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`Failed to fetch ${path}`);
  const data = await res.json();
  return data.data ?? [];
}

export async function postJson<T>(path: string, body: unknown): Promise<T> {
  const res = await fetchWithTimeout(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Failed to POST ${path}`);
  return res.json();
}
