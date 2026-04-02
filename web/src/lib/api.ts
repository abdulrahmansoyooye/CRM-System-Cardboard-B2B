export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api/v1";

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
  const res = await fetch(`${API_BASE_URL}/industry`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch industries');
  }

  const data = await res.json();
  return data.data;
}

export async function getCategories() {
  const res = await fetch(`${API_BASE_URL}/category`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }

  const data = await res.json();
  return data.data;
}

export async function getBlogs() {
  const res = await fetch(`${API_BASE_URL}/blog`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch blogs');
  }

  const data = await res.json();
  return data.data;
}

export async function getSettings() {
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
  const res = await fetch(`${API_BASE_URL}/inquiry`, {
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
