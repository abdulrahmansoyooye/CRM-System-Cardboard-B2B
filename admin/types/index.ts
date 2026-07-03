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
  slug: string;
  shortDescription?: string;
  fullDescription?: string;
  ply?: string;
  categoryId?: { _id: string; name: string };
  images?: string[];
  specifications?: string[];
  sizes?: string[];
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
  slug: string;
  category?: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  tags?: string[];
  seo?: Record<string, unknown>;
  status?: 'draft' | 'published';
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
  image?: string;
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
  location?: string;
  images?: string[];
  isFeatured?: boolean;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// ──────────────────────────────────────────────────────────────────────────────
// INDUSTRIES
// ──────────────────────────────────────────────────────────────────────────────

export interface IIndustry {
  _id: string;
  name: string;
  slug: string;
  overview?: string;
  description?: string;
  images?: string[];
  relatedProducts?: IProduct[];
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
  location?: string;
  type?: string;
  description?: string;
  requirements?: string[];
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// ──────────────────────────────────────────────────────────────────────────────
// JOB APPLICATIONS
// ──────────────────────────────────────────────────────────────────────────────

export interface IJobApplication {
  _id: string;
  jobId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  resume?: string;
  coverLetter?: string;
  status?: 'submitted' | 'reviewed' | 'shortlisted' | 'rejected';
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
  message: string;
  subject?: string;
  status?: 'new' | 'in_progress' | 'resolved' | 'closed';
  createdAt?: string;
  updatedAt?: string;
}

// ──────────────────────────────────────────────────────────────────────────────
// QUOTES
// ──────────────────────────────────────────────────────────────────────────────

export interface IQuote {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  quantity?: number;
  specifications?: string;
  message?: string;
  status?: 'new' | 'sent' | 'accepted' | 'rejected';
  createdAt?: string;
  updatedAt?: string;
}

// ──────────────────────────────────────────────────────────────────────────────
// TESTIMONIALS
// ──────────────────────────────────────────────────────────────────────────────

export interface ITestimonial {
  _id: string;
  name: string;
  company?: string;
  role?: string;
  message: string;
  rating?: number;
  image?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// ──────────────────────────────────────────────────────────────────────────────
// ASSETS
// ──────────────────────────────────────────────────────────────────────────────

export interface IAsset {
  _id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  url: string;
  size?: number;
  mimeType?: string;
  metadata?: Record<string, unknown>;
  createdAt?: string;
  updatedAt?: string;
}

// ──────────────────────────────────────────────────────────────────────────────
// SETTINGS
// ──────────────────────────────────────────────────────────────────────────────

export interface ISettings {
  _id: string;
  companyName: string;
  tagline?: string;
  logo?: string;
  email?: string;
  phone?: string;
  address?: string;
  contactEmail?: string;
  contactPhone?: string;
  defaultSEO?: {
    metaTitle?: string;
    metaDesc?: string;
    ogImage?: string;
  };
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface IBrandingSettings {
  companyName: string;
  tagline?: string;
  logo?: string;
}

export interface IContactSettings {
  email?: string;
  phone?: string;
  address?: string;
  contactEmail?: string;
  contactPhone?: string;
}

export interface ISEOSettings {
  defaultSEO?: {
    metaTitle?: string;
    metaDesc?: string;
    ogImage?: string;
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
