import { fetchJson, getWithQuery } from "./client";
import { TProduct, TCategory } from "@/types";

export async function getProducts(query?: Record<string, string | number | boolean | undefined | null>): Promise<TProduct[]> {
  return getWithQuery<TProduct>("/products", query || {});
}

export async function getProductBySlug(slug: string): Promise<TProduct> {
  return fetchJson<TProduct>(`/products/${slug}`);
}

export async function getCategories(): Promise<TCategory[]> {
  return fetchJson<TCategory[]>("/categories");
}
