/**
 * Admin-specific TypeScript types and interfaces
 * 
 * These types are used across the admin dashboard forms, services, and components.
 * Mirror the API DTOs but are used for client-side validation and type safety.
 */

// ──────────────────────────────────────────────────────────────────────────────
// PRODUCTS
// ──────────────────────────────────────────────────────────────────────────────

export interface IProduct {
  _id: string;
  name: string;
  slug?: string;
  shortDescription?: string;
  fullDescription?: string;
  materialDetails?: string;
  strengthDetails?: string;
  availableSizes?: string[];
  moq?: number;
  deliveryTimeline?: string;
  categoryId?: { _id: string; name: string } | string;
  images?: string[];
  specifications?: string[];
  seo?: { metaTitle?: string; metaDescription?: string };
  isActive?: boolean;
  isFeatured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// ──────────────────────────────────────────────────────────────────────────────
// BLOGS
// ──────────────────────────────────────────────────────────────────────────────

export interface IBlog {
  _id: string;
  title: string;
  slug?: string;
  category?: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  tags?: string[];
  seo?: Record<string, unknown>;
  status?: 'draft' | 'published';
  isPublished?: boolean;
  publishedAt?: string | Date;
  createdAt?: string;
  updatedAt?: string;
}

// ──────────────────────────────────────────────────────────────────────────────
// CATEGORIES
// ──────────────────────────────────────────────────────────────────────────────

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  coverImage?: string;
  seo?: { metaTitle?: string; metaDescription?: string };
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// ──────────────────────────────────────────────────────────────────────────────
// EVENTS
// ──────────────────────────────────────────────────────────────────────────────

export interface IEvent {
  _id: string;
  title: string;
  description?: string;
  eventDate?: string | Date;
  images?: string[];
  isFeatured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// ──────────────────────────────────────────────────────────────────────────────
// INDUSTRIES
// ──────────────────────────────────────────────────────────────────────────────

export interface IIndustry {
  _id: string;
  name: string;
  slug?: string;
  overview?: string;
  images?: string[];
  relatedProducts?: string[];
  seo?: { metaTitle?: string; metaDescription?: string };
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// ──────────────────────────────────────────────────────────────────────────────
// JOBS
// ──────────────────────────────────────────────────────────────────────────────

export interface IJob {
  _id: string;
  title: string;
  department?: string;
  experience?: string;
  location?: string;
  type?: string;
  salary?: string;
  description?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ──────────────────────────────────────────────────────────────────────────────
// JOB APPLICATIONS
// ──────────────────────────────────────────────────────────────────────────────

export interface IJobApplication {
  _id: string;
  jobId: string;
  name: string;
  email: string;
  phone: string;
  resumeFile?: string;
  status?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ──────────────────────────────────────────────────────────────────────────────
// INQUIRIES
// ──────────────────────────────────────────────────────────────────────────────

export interface IInquiry {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  productInterested?: string;
  status?: 'new' | 'contacted' | 'quoted' | 'closed';
  createdAt?: string;
  updatedAt?: string;
}

// ──────────────────────────────────────────────────────────────────────────────
// QUOTES
// ──────────────────────────────────────────────────────────────────────────────

export interface IQuote {
  _id: string;
  productId?: string;
  quantity?: number;
  customizationDetails?: string;
  deliveryLocation?: string;
  name: string;
  phone?: string;
  email: string;
  status?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ──────────────────────────────────────────────────────────────────────────────
// TESTIMONIALS
// ──────────────────────────────────────────────────────────────────────────────

export interface ITestimonial {
  _id: string;
  clientName: string;
  company?: string;
  feedback: string;
  rating?: number;
  isPublished?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// ──────────────────────────────────────────────────────────────────────────────
// ASSETS
// ──────────────────────────────────────────────────────────────────────────────

export interface IAsset {
  _id: string;
  name: string;
  category?: string;
  url: string;
  size?: string;
  dimensions?: string;
  type?: string;
  mimeType?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ──────────────────────────────────────────────────────────────────────────────
// SETTINGS
// ──────────────────────────────────────────────────────────────────────────────

export interface ISettings {
  _id: string;
  companyName?: string;
  tagline?: string;
  logo?: string;
  favicon?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  defaultSEO?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  homepageHero?: {
    title?: string;
    subtitle?: string;
    image?: string;
  };
  ctaBanner?: {
    title?: string;
    buttonText?: string;
    buttonLink?: string;
  };
  analyticsId?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IBrandingSettings {
  companyName: string;
  tagline?: string;
  logo?: string;
}

export interface IContactSettings {
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
}

export interface ISEOSettings {
  defaultSEO?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

export interface ISocialSettings {
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
}

// ──────────────────────────────────────────────────────────────────────────────
// ADMIN USER
// ──────────────────────────────────────────────────────────────────────────────

export interface IAdminUser {
  _id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'admin' | 'content_manager' | 'hr_manager' | 'sales_manager';
  isActive: boolean;
  lastLogin: string | Date;
  createdAt?: string;
  updatedAt?: string;
}

// ──────────────────────────────────────────────────────────────────────────────
// COMMON TYPES
// ──────────────────────────────────────────────────────────────────────────────

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  searchTerm?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface StatusConfig {
  label: string;
  color: string;
  bgColor: string;
}

export type DashboardFormData<T> = Partial<T> & { id?: string };
