import { postJson } from "./client";

export async function submitInquiry(data: unknown) {
  return postJson("/contact", data);
}

export async function submitQuote(data: unknown) {
  return postJson("/quote", data);
}
