import { fetchJson, getWithQuery } from "./client";
import { TBlog, TEvent, TTestimonial, TIndustry } from "@/types";

export async function getBlogs(query?: Record<string, string | number | boolean | undefined | null>): Promise<TBlog[]> {
  return getWithQuery<TBlog>("/blogs", query || {});
}

export async function getBlogBySlug(slug: string): Promise<TBlog> {
  return fetchJson<TBlog>(`/blogs/${slug}`);
}

export async function getEvents(query?: Record<string, string | number | boolean | undefined | null>): Promise<TEvent[]> {
  return getWithQuery<TEvent>("/events", query || {});
}

export async function getEventById(id: string): Promise<TEvent> {
  return fetchJson<TEvent>(`/events/${id}`);
}

export async function getIndustries(): Promise<TIndustry[]> {
  return fetchJson<TIndustry[]>("/industries");
}

export async function getIndustryBySlug(slug: string): Promise<TIndustry> {
  return fetchJson<TIndustry>(`/industries/${slug}`);
}

export async function getTestimonials(): Promise<TTestimonial[]> {
  return fetchJson<TTestimonial[]>("/testimonials");
}
