import { getSession } from "next-auth/react";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const api = async <T = unknown>(url: string, options?: RequestInit): Promise<T> => {
  const session = await getSession();
  const token = session?.accessToken;
  const res = await fetch(`${API_BASE_URL}/api/v1${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { "authorization": `Bearer ${token}` } : {}),
      ...(options?.headers || {}),
    }
  });  


  const data = await res.json();
  if (!res.ok) {
    const errorData = data as { message?: string };
    throw new Error(errorData.message || "Failed to fetch data");
  }
  return data as T;
};
