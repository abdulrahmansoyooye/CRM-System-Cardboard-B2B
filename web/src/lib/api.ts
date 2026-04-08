import { TBlog, TSettings } from "@/types";
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://crm-system-cardboard-b2b.onrender.com/api/v1";

export async function getProducts(query?: Record<string, string>) {
  const queryString = query ? '?' + new URLSearchParams(query).toString() : '';
  const res = await fetch(`${API_BASE_URL}/products${queryString}`, {
    cache: 'no-store', // Ensure we always get fresh data for production sync
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const data = await res.json();
  return data.data; // Standardizing to the backend response format
}

export async function getProductBySlug(slug: string) {
  const res = await fetch(`${API_BASE_URL}/products/${slug}`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }

  const data = await res.json();
  return data.data;
}

export async function getIndustries() {
  const res = await fetch(`${API_BASE_URL}/industries`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch industries');
  }

  const data = await res.json();
  return data.data;
}

export async function getCategories() {
  const res = await fetch(`${API_BASE_URL}/categories`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }

  const data = await res.json();
  return data.data;
}

export async function getBlogs(): Promise<TBlog[]> {
  const res = await fetch(`${API_BASE_URL}/blogs`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch blogs');
  }

  const data = await res.json();
  return data.data || [];
}

export async function getBlogBySlug(slug: string): Promise<TBlog> {
  const res = await fetch(`${API_BASE_URL}/blogs/${slug}`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch blog');
  }

  const data = await res.json();
  return data.data;
}

export async function getJobs() {
  const res = await fetch(`${API_BASE_URL}/jobs`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch jobs');
  }

  const data = await res.json();
  return data.data;
}

export async function getSettings(): Promise<TSettings[]> {
  const res = await fetch(`${API_BASE_URL}/settings`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch settings');
  }

  const data = await res.json();
  return data.data;
}
export async function submitInquiry(data: unknown) {
  const res = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to submit inquiry');
  return res.json();
}

export async function submitQuote(data: unknown) {
  const res = await fetch(`${API_BASE_URL}/quote`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to submit quote');
  return res.json();
}

export async function submitApplication(data: unknown) {
  const res = await fetch(`${API_BASE_URL}/jobs/apply`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to submit application');
  return res.json();
}

export async function getEvents() {
  const res = await fetch(`${API_BASE_URL}/events`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch events');
  const data = await res.json();
  return data.data || [];
}
