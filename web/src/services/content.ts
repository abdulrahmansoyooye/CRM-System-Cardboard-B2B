import { fetchJson, getWithQuery } from "./client";
import { TBlog, TEvent, TTestimonial, TIndustry } from "@/types";

export async function getBlogs(query?: Record<string, string | number | boolean | undefined | null>): Promise<TBlog[]> {
  return getWithQuery<TBlog>("/blogs", query || {}, undefined, ["blogs"]);
}

export async function getBlogBySlug(slug: string): Promise<TBlog> {
  return fetchJson<TBlog>(`/blogs/${slug}`, undefined, ["blogs"]);
}

export async function getEvents(query?: Record<string, string | number | boolean | undefined | null>): Promise<TEvent[]> {
  return getWithQuery<TEvent>("/events", query || {}, undefined, ["events"]);
}

export async function getEventById(id: string): Promise<TEvent> {
  return fetchJson<TEvent>(`/events/${id}`, undefined, ["events"]);
}

export async function getIndustries(): Promise<TIndustry[]> {
  return fetchJson<TIndustry[]>("/industries", undefined, ["industries"]);
}

export async function getIndustryBySlug(slug: string): Promise<TIndustry> {
  return fetchJson<TIndustry>(`/industries/${slug}`, undefined, ["industries"]);
}

export async function getTestimonials(): Promise<TTestimonial[]> {
  return fetchJson<TTestimonial[]>("/testimonials", undefined, ["testimonials"]);
}
