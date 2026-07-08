import { Request, Response, NextFunction } from 'express';

/**
 * Caching Middleware
 * 
 * Adds Cache-Control headers to API responses to enable
 * browser caching, CDN caching, and client-side optimization.
 * 
 * GET requests receive cache headers based on resource type.
 * POST/PUT/DELETE requests are not cached.
 */

const CACHE_DURATIONS = {
  PRODUCTS: 'public, max-age=60, s-maxage=120, stale-while-revalidate=300',
  CATEGORIES: 'public, max-age=300, s-maxage=600, stale-while-revalidate=3600',
  INDUSTRIES: 'public, max-age=300, s-maxage=600, stale-while-revalidate=3600',
  BLOGS: 'public, max-age=60, s-maxage=120, stale-while-revalidate=300',
  EVENTS: 'public, max-age=60, s-maxage=120, stale-while-revalidate=300',
  JOBS: 'public, max-age=300, s-maxage=600, stale-while-revalidate=3600',
  TESTIMONIALS: 'public, max-age=300, s-maxage=600, stale-while-revalidate=3600',
  SETTINGS: 'public, max-age=300, s-maxage=600, stale-while-revalidate=3600',
  DEFAULT: 'public, max-age=60, s-maxage=120, stale-while-revalidate=300',
  NO_CACHE: 'private, no-cache, no-store, must-revalidate',
};

export const cacheMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Only cache GET requests
  if (req.method !== 'GET') {
    res.set('Cache-Control', CACHE_DURATIONS.NO_CACHE);
    return next();
  }

  // Determine cache duration based on route
  let cacheControl = CACHE_DURATIONS.DEFAULT;

  const path = req.path.toLowerCase();

  if (path.includes('/products')) {
    cacheControl = CACHE_DURATIONS.PRODUCTS;
  } else if (path.includes('/categories')) {
    cacheControl = CACHE_DURATIONS.CATEGORIES;
  } else if (path.includes('/industries')) {
    cacheControl = CACHE_DURATIONS.INDUSTRIES;
  } else if (path.includes('/blogs')) {
    cacheControl = CACHE_DURATIONS.BLOGS;
  } else if (path.includes('/events')) {
    cacheControl = CACHE_DURATIONS.EVENTS;
  } else if (path.includes('/jobs')) {
    cacheControl = CACHE_DURATIONS.JOBS;
  } else if (path.includes('/testimonials')) {
    cacheControl = CACHE_DURATIONS.TESTIMONIALS;
  } else if (path.includes('/settings')) {
    cacheControl = CACHE_DURATIONS.SETTINGS;
  }

  // Apply Vary header to indicate that caching may depend on authorization
  if (path.includes('/admin') || path.includes('/auth')) {
    cacheControl = CACHE_DURATIONS.NO_CACHE;
    res.set('Vary', 'Authorization');
  } else {
    res.set('Vary', 'Accept-Encoding');
  }

  // Add Cache-Tag header for targeted invalidation
  if (cacheControl !== CACHE_DURATIONS.NO_CACHE) {
    const segments = path.split('/').filter(Boolean);
    const resource = segments[0] || 'default';
    res.set('Cache-Tag', resource);
  }

  res.set('Cache-Control', cacheControl);
  next();
};
