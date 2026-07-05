import { unstable_cache } from "next/cache";
import { cache } from "react";
import { CACHE_DURATIONS } from "./api-config";

import {
  getProducts as getProductsSvc,
  getProductBySlug as getProductBySlugSvc,
  getCategories as getCategoriesSvc,
  getIndustries as getIndustriesSvc,
  getIndustryBySlug as getIndustryBySlugSvc,
  getBlogs as getBlogsSvc,
  getBlogBySlug as getBlogBySlugSvc,
  getEvents as getEventsSvc,
  getEventById as getEventByIdSvc,
  getJobs as getJobsSvc,
  getJobById as getJobByIdSvc,
  getTestimonials as getTestimonialsSvc,
  getSettings as getSettingsSvc,
  submitInquiry as submitInquirySvc,
  submitQuote as submitQuoteSvc,
  submitApplication as submitApplicationSvc,
} from "@/services";

const ISR_60 = CACHE_DURATIONS.PRODUCTS;
const ISR_300 = CACHE_DURATIONS.SETTINGS;

function createCachedGetter<T>(key: string, fn: () => Promise<T>, revalidate: number) {
  return unstable_cache(cache(fn), [key], { revalidate });
}

const getCachedCategories = createCachedGetter("categories", () => getCategoriesSvc(), ISR_300);
const getCachedIndustries = createCachedGetter("industries", () => getIndustriesSvc(), ISR_60);
const getCachedJobs = createCachedGetter("jobs", () => getJobsSvc(), ISR_60);
const getCachedTestimonials = createCachedGetter("testimonials", () => getTestimonialsSvc(), ISR_300);
const getCachedSettings = createCachedGetter("settings", () => getSettingsSvc(), ISR_300);

const getCachedProducts = cache(async (
  query?: Record<string, string | number | boolean | undefined | null>
) => {
  return getProductsSvc(query);
});

const getCachedBlogs = cache(async (
  query?: Record<string, string | number | boolean | undefined | null>
) => {
  return getBlogsSvc(query);
});

const getCachedEvents = cache(async (
  query?: Record<string, string | number | boolean | undefined | null>
) => {
  return getEventsSvc(query);
});

export async function getProducts(query?: Record<string, string | number | boolean | undefined | null>) {
  return getCachedProducts(query);
}

export async function getProductBySlug(slug: string) {
  return getProductBySlugSvc(slug);
}

export async function getCategories() {
  return getCachedCategories();
}

export async function getIndustries() {
  return getCachedIndustries();
}

export async function getIndustryBySlug(slug: string) {
  return getIndustryBySlugSvc(slug);
}

export async function getBlogs(query?: Record<string, string | number | boolean | undefined | null>) {
  return getCachedBlogs(query);
}

export async function getBlogBySlug(slug: string) {
  return getBlogBySlugSvc(slug);
}

export async function getEvents(query?: Record<string, string | number | boolean | undefined | null>) {
  return getCachedEvents(query);
}

export async function getEventById(id: string) {
  return getEventByIdSvc(id);
}

export async function getJobs() {
  return getCachedJobs();
}

export async function getJobById(id: string) {
  return getJobByIdSvc(id);
}

export async function getTestimonials() {
  return getCachedTestimonials();
}

export async function getSettings() {
  return getCachedSettings();
}

export async function submitInquiry(data: unknown) {
  return submitInquirySvc(data);
}

export async function submitQuote(data: unknown) {
  return submitQuoteSvc(data);
}

export async function submitApplication(data: unknown) {
  return submitApplicationSvc(data);
}
