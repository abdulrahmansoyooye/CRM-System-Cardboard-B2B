/**
 * Shared API Configuration
 * 
 * This module defines the base API URL and other shared configuration
 * used by both the public website and admin dashboard.
 * 
 * This ensures a single source of truth for API endpoints.
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://crm-system-cardboard-b2b.onrender.com";

export const API_TIMEOUT = 30000; // 30 seconds

/**
 * ISR (Incremental Static Regeneration) cache durations in seconds
 */
export const CACHE_DURATIONS = {
  PRODUCTS: 60,        // 1 minute - frequent updates
  BLOGS: 60,           // 1 minute - frequent updates
  EVENTS: 60,          // 1 minute - frequent updates
  CATEGORIES: 300,     // 5 minutes - less frequent
  INDUSTRIES: 300,     // 5 minutes - less frequent
  JOBS: 300,           // 5 minutes - less frequent
  TESTIMONIALS: 300,   // 5 minutes - less frequent
  SETTINGS: 300,       // 5 minutes - site configuration
} as const;

/**
 * Backend cache headers
 * Applied to API responses to optimize caching behavior
 */
export const CACHE_HEADERS = {
  PUBLIC_SHORT: 'public, max-age=60, s-maxage=60, stale-while-revalidate=120',
  PUBLIC_MEDIUM: 'public, max-age=300, s-maxage=300, stale-while-revalidate=600',
  PUBLIC_LONG: 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
  PRIVATE: 'private, max-age=0, must-revalidate',
  NO_CACHE: 'no-cache, no-store, must-revalidate',
} as const;
