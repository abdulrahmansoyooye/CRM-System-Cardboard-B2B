import { getSession } from "next-auth/react";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const api = async (url: string, options?: RequestInit) => {
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
    throw new Error(data.message || "Failed to fetch data");
  }
  return data;
};