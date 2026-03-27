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
  const res = await fetch(`${API_BASE_URL}/industries`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch industries');
  }

  const data = await res.json();
  return data.data;
}
