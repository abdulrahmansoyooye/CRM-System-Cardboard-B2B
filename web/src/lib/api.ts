import { unstable_cache } from "next/cache";
import { cache } from "react";
import { TBlog, TSettings, TProduct, TCategory, TIndustry, TEvent, TJob, TTestimonial } from "@/types";
import { API_BASE_URL, CACHE_DURATIONS } from "./api-config";

const ISR_60 = CACHE_DURATIONS.PRODUCTS;
const ISR_300 = CACHE_DURATIONS.SETTINGS;
const FETCH_TIMEOUT_MS = 10_000;

async function fetchWithTimeout(input: string, init: RequestInit = {}, timeoutMs = FETCH_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(input, {
      ...init,
      signal: controller.signal,
    });
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

async function fetchJson<T>(path: string, revalidate: number): Promise<T> {
  const res = await fetchWithTimeout(`${API_BASE_URL}${path}`, { next: { revalidate }, headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`Failed to fetch ${path}`);
  const data = await res.json();
  return data?.data ?? data;
}

function createCachedGetter<T>(key: string, path: string, revalidate: number) {
  return unstable_cache(
    cache(async (): Promise<T> => fetchJson<T>(path, revalidate)),
    [key],
    { revalidate }
  );
}

const getCachedCategories = createCachedGetter<TCategory[]>("categories", "/categories", ISR_300);
const getCachedIndustries = createCachedGetter<TIndustry[]>("industries", "/industries", ISR_60);
const getCachedJobs = createCachedGetter<TJob[]>("jobs", "/jobs", ISR_60);
const getCachedTestimonials = createCachedGetter<TTestimonial[]>("testimonials", "/testimonials", ISR_300);
const getCachedSettings = createCachedGetter<TSettings[]>("settings", "/settings", ISR_300);

// ─── PRODUCTS ────────────────────────────────────────────────────────────────
const getCachedProducts = cache(async (
  query?: Record<string, string | number | boolean | undefined | null>
): Promise<TProduct[]> => {
  const queryString = buildQueryString(query);
  const res = await fetchWithTimeout(`${API_BASE_URL}/products${queryString}`, { next: { revalidate: ISR_60 } });
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  return data.data ?? [];
});

export async function getProducts(
  query?: Record<string, string | number | boolean | undefined | null>
): Promise<TProduct[]> {
  return getCachedProducts(query);
}

export async function getProductBySlug(slug: string): Promise<TProduct> {
  return fetchJson<TProduct>(`/products/${slug}`, ISR_60);
}

// ─── CATEGORIES ──────────────────────────────────────────────────────────────
export async function getCategories(): Promise<TCategory[]> {
  return getCachedCategories();
}

// ─── INDUSTRIES ──────────────────────────────────────────────────────────────
export async function getIndustries(): Promise<TIndustry[]> {
  return getCachedIndustries();
}

export async function getIndustryBySlug(slug: string): Promise<TIndustry> {
  return fetchJson<TIndustry>(`/industries/${slug}`, ISR_60);
}

// ─── BLOGS ───────────────────────────────────────────────────────────────────
const getCachedBlogs = cache(async (
  query?: Record<string, string | number | boolean | undefined | null>
): Promise<TBlog[]> => {
  const queryString = buildQueryString(query);
  const res = await fetchWithTimeout(`${API_BASE_URL}/blogs${queryString}`, { next: { revalidate: ISR_60 } });
  if (!res.ok) throw new Error("Failed to fetch blogs");
  const data = await res.json();
  return data.data ?? [];
});

export async function getBlogs(
  query?: Record<string, string | number | boolean | undefined | null>
): Promise<TBlog[]> {
  return getCachedBlogs(query);
}

export async function getBlogBySlug(slug: string): Promise<TBlog> {
  return fetchJson<TBlog>(`/blogs/${slug}`, ISR_60);
}

// ─── EVENTS ──────────────────────────────────────────────────────────────────
const getCachedEvents = cache(async (
  query?: Record<string, string | number | boolean | undefined | null>
): Promise<TEvent[]> => {
  const queryString = buildQueryString(query);
  const res = await fetchWithTimeout(`${API_BASE_URL}/events${queryString}`, { next: { revalidate: ISR_60 } });
  if (!res.ok) throw new Error("Failed to fetch events");
  const data = await res.json();
  return data.data ?? [];
});

export async function getEvents(
  query?: Record<string, string | number | boolean | undefined | null>
): Promise<TEvent[]> {
  return getCachedEvents(query);
}

export async function getEventById(id: string): Promise<TEvent> {
  return fetchJson<TEvent>(`/events/${id}`, ISR_60);
}

// ─── JOBS ─────────────────────────────────────────────────────────────────────
export async function getJobs(): Promise<TJob[]> {
  return getCachedJobs();
}

export async function getJobById(id: string): Promise<TJob> {
  return fetchJson<TJob>(`/jobs/${id}`, ISR_60);
}

// ─── TESTIMONIALS ────────────────────────────────────────────────────────────
export async function getTestimonials(): Promise<TTestimonial[]> {
  return getCachedTestimonials();
}

// ─── SETTINGS ────────────────────────────────────────────────────────────────
export async function getSettings(): Promise<TSettings[]> {
  return getCachedSettings();
}

// ─── MUTATIONS (CLIENT-SIDE ONLY) ────────────────────────────────────────────
export async function submitInquiry(data: unknown) {
  const res = await fetchWithTimeout(`${API_BASE_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to submit inquiry");
  return res.json();
}

export async function submitQuote(data: unknown) {
  const res = await fetchWithTimeout(`${API_BASE_URL}/quote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to submit quote");
  return res.json();
}

export async function submitApplication(data: unknown) {
  const res = await fetchWithTimeout(`${API_BASE_URL}/jobs/apply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to submit application");
  return res.json();
}
