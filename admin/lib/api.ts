import { getSession } from "next-auth/react";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const api = async <T = unknown>(url: string, options?: RequestInit): Promise<T> => {
  const session = await getSession();
  const token = session?.accessToken;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(`${API_BASE_URL}/api/v1${url}`, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "authorization": `Bearer ${token}` } : {}),
        ...(options?.headers || {}),
      }
    });
  
    clearTimeout(timeoutId);
  
    const data = await res.json();
    if (!res.ok) {
      const errorData = data as { message?: string };
      throw new Error(errorData.message || "Failed to fetch data");
    }
    return data as T;
  } catch (err) {
    clearTimeout(timeoutId);
    if (err instanceof DOMException && err.name === "AbortError") {
      throw new Error("Request timed out");
    }
    throw err;
  }
};
