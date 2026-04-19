import { TBlog, TSettings, TProduct, TCategory, TIndustry, TEvent, TJob, TTestimonial } from "@/types";


export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://crm-system-cardboard-b2b.onrender.com/api/v1";

// ─── CACHING HELPERS ────────────────────────────────────────────────────────
// ISR: revalidate every 60 seconds for most listing pages
// no-store: only for user-specific / admin pages
const ISR_60 = { next: { revalidate: 60 } };
const ISR_300 = { next: { revalidate: 300 } };

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function buildQueryString(query?: Record<string, string | number | boolean | undefined | null>): string {
  if (!query) return "";
  const entries = Object.entries(query)
    .filter(([_, v]) => v !== "" && v !== undefined && v !== null)
    .map(([k, v]) => [k, String(v)]);

  return entries.length > 0
    ? "?" + new URLSearchParams(Object.fromEntries(entries)).toString()
    : "";
}

// ─── PRODUCTS ────────────────────────────────────────────────────────────────
export async function getProducts(
  query?: Record<string, string | number | boolean | undefined | null>
): Promise<TProduct[]> {
  const queryString = buildQueryString(query);
  const res = await fetch(`${API_BASE_URL}/products${queryString}`, ISR_60);
  if (!res.ok) throw new Error("Failed to fetch products");
  const data = await res.json();
  return data.data ?? [];
}

export async function getProductBySlug(slug: string): Promise<TProduct> {
  const res = await fetch(`${API_BASE_URL}/products/${slug}`, ISR_60);
  if (!res.ok) throw new Error("Failed to fetch product");
  const data = await res.json();
  return data.data;
}

// ─── CATEGORIES ──────────────────────────────────────────────────────────────
export async function getCategories(): Promise<TCategory[]> {
  const res = await fetch(`${API_BASE_URL}/categories`, ISR_300);
  if (!res.ok) throw new Error("Failed to fetch categories");
  const data = await res.json();
  return data.data ?? [];
}

// ─── INDUSTRIES ──────────────────────────────────────────────────────────────
export async function getIndustries(): Promise<TIndustry[]> {
  const res = await fetch(`${API_BASE_URL}/industries`, ISR_60);
  if (!res.ok) throw new Error("Failed to fetch industries");
  const data = await res.json();
  return data.data ?? [];
}

export async function getIndustryBySlug(slug: string): Promise<TIndustry> {
  const res = await fetch(`${API_BASE_URL}/industries/${slug}`, ISR_60);
  if (!res.ok) throw new Error("Failed to fetch industry");
  const data = await res.json();
  return data.data;
}

// ─── BLOGS ───────────────────────────────────────────────────────────────────
export async function getBlogs(
  query?: Record<string, string | number | boolean | undefined | null>
): Promise<TBlog[]> {
  const queryString = buildQueryString(query);
  const res = await fetch(`${API_BASE_URL}/blogs${queryString}`, ISR_60);
  if (!res.ok) throw new Error("Failed to fetch blogs");
  const data = await res.json();
  return data.data ?? [];
}

export async function getBlogBySlug(slug: string): Promise<TBlog> {
  const res = await fetch(`${API_BASE_URL}/blogs/${slug}`, ISR_60);
  if (!res.ok) throw new Error("Failed to fetch blog");
  const data = await res.json();
  return data.data;
}

// ─── EVENTS ──────────────────────────────────────────────────────────────────
export async function getEvents(
  query?: Record<string, string | number | boolean | undefined | null>
): Promise<TEvent[]> {
  const queryString = buildQueryString(query);
  const res = await fetch(`${API_BASE_URL}/events${queryString}`, ISR_60);
  if (!res.ok) throw new Error("Failed to fetch events");
  const data = await res.json();
  return data.data ?? [];
}

export async function getEventById(id: string): Promise<TEvent> {
  const res = await fetch(`${API_BASE_URL}/events/${id}`, ISR_60);
  if (!res.ok) throw new Error("Failed to fetch event");
  const data = await res.json();
  return data.data;
}

// ─── JOBS ─────────────────────────────────────────────────────────────────────
export async function getJobs(): Promise<TJob[]> {
  const res = await fetch(`${API_BASE_URL}/jobs`, ISR_60);
  if (!res.ok) throw new Error("Failed to fetch jobs");
  const data = await res.json();
  return data.data ?? [];
}

export async function getJobById(id: string): Promise<TJob> {
  const res = await fetch(`${API_BASE_URL}/jobs/${id}`, ISR_60);
  if (!res.ok) throw new Error("Failed to fetch job");
  const data = await res.json();
  return data.data;
}

// ─── TESTIMONIALS ────────────────────────────────────────────────────────────
export async function getTestimonials(): Promise<TTestimonial[]> {
  const res = await fetch(`${API_BASE_URL}/testimonials`, ISR_300);
  if (!res.ok) throw new Error("Failed to fetch testimonials");
  const data = await res.json();
  return data.data ?? [];
}


// ─── SETTINGS ────────────────────────────────────────────────────────────────
export async function getSettings(): Promise<TSettings[]> {
  const res = await fetch(`${API_BASE_URL}/settings`, ISR_300);
  if (!res.ok) throw new Error("Failed to fetch settings");
  const data = await res.json();
  return data.data;
}

// ─── MUTATIONS (CLIENT-SIDE ONLY) ────────────────────────────────────────────
export async function submitInquiry(data: unknown) {
  const res = await fetch(`${API_BASE_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to submit inquiry");
  return res.json();
}

export async function submitQuote(data: unknown) {
  // Backend route is POST /quote
  const res = await fetch(`${API_BASE_URL}/quote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to submit quote");
  return res.json();
}

export async function submitApplication(data: unknown) {
  const res = await fetch(`${API_BASE_URL}/jobs/apply`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to submit application");
  return res.json();
}
