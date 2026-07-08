import { cache } from "react";

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

const getCachedCategories = cache(() => getCategoriesSvc());
const getCachedIndustries = cache(() => getIndustriesSvc());
const getCachedJobs = cache(() => getJobsSvc());
const getCachedTestimonials = cache(() => getTestimonialsSvc());
const getCachedSettings = cache(() => getSettingsSvc());

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
