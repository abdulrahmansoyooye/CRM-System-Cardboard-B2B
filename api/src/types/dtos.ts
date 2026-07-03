/**
 * Data Transfer Objects (DTOs) for API Request/Response Payloads
 * 
 * These interfaces define the shape of data flowing in and out of services.
 * Every service method should use specific DTOs instead of `any` type.
 */

// ──────────────────────────────────────────────────────────────────────────────
// USER & AUTHENTICATION
// ──────────────────────────────────────────────────────────────────────────────

export interface CreateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: 'super_admin' | 'admin' | 'content_manager' | 'hr_manager' | 'sales_manager';
  phone?: string;
  isActive?: boolean;
}

export interface UpdateUserDTO {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  role?: 'super_admin' | 'admin' | 'content_manager' | 'hr_manager' | 'sales_manager';
  phone?: string;
  isActive?: boolean;
}

export interface LoginPayloadDTO {
  email: string;
  password: string;
}

export interface UserResponseDTO {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phone?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// ──────────────────────────────────────────────────────────────────────────────
// PRODUCTS
// ──────────────────────────────────────────────────────────────────────────────

export interface CreateProductDTO {
  name: string;
  slug?: string;
  shortDescription?: string;
  fullDescription?: string;
  ply?: string;
  categoryId?: string;
  images?: string[];
  specifications?: string[];
  sizes?: string[];
  isActive?: boolean;
  isFeatured?: boolean;
}

export interface UpdateProductDTO {
  name?: string;
  slug?: string;
  shortDescription?: string;
  fullDescription?: string;
  ply?: string;
  categoryId?: string;
  images?: string[];
  specifications?: string[];
  sizes?: string[];
  isActive?: boolean;
  isFeatured?: boolean;
}

// ──────────────────────────────────────────────────────────────────────────────
// BLOGS
// ──────────────────────────────────────────────────────────────────────────────

export interface CreateBlogDTO {
  title: string;
  slug?: string;
  category?: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  tags?: string[];
  seo?: Record<string, unknown>;
  status?: 'draft' | 'published';
  publishedAt?: Date;
}

export interface UpdateBlogDTO {
  title?: string;
  slug?: string;
  category?: string;
  excerpt?: string;
  content?: string;
  featuredImage?: string;
  tags?: string[];
  seo?: Record<string, unknown>;
  status?: 'draft' | 'published';
  publishedAt?: Date;
}

// ──────────────────────────────────────────────────────────────────────────────
// CATEGORIES
// ──────────────────────────────────────────────────────────────────────────────

export interface CreateCategoryDTO {
  name: string;
  slug?: string;
  description?: string;
  image?: string;
  isActive?: boolean;
}

export interface UpdateCategoryDTO {
  name?: string;
  slug?: string;
  description?: string;
  image?: string;
  isActive?: boolean;
}

// ──────────────────────────────────────────────────────────────────────────────
// EVENTS
// ──────────────────────────────────────────────────────────────────────────────

export interface CreateEventDTO {
  title: string;
  description?: string;
  eventDate?: Date;
  location?: string;
  images?: string[];
  isFeatured?: boolean;
  isActive?: boolean;
}

export interface UpdateEventDTO {
  title?: string;
  description?: string;
  eventDate?: Date;
  location?: string;
  images?: string[];
  isFeatured?: boolean;
  isActive?: boolean;
}

// ──────────────────────────────────────────────────────────────────────────────
// INDUSTRIES
// ──────────────────────────────────────────────────────────────────────────────

export interface CreateIndustryDTO {
  name: string;
  slug?: string;
  overview?: string;
  description?: string;
  images?: string[];
  relatedProducts?: string[];
}

export interface UpdateIndustryDTO {
  name?: string;
  slug?: string;
  overview?: string;
  description?: string;
  images?: string[];
  relatedProducts?: string[];
}

// ──────────────────────────────────────────────────────────────────────────────
// INQUIRIES
// ──────────────────────────────────────────────────────────────────────────────

export interface CreateInquiryDTO {
  name: string;
  email: string;
  phone?: string;
  message: string;
  subject?: string;
  status?: 'new' | 'in_progress' | 'resolved' | 'closed';
}

export interface UpdateInquiryDTO {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  subject?: string;
  status?: 'new' | 'in_progress' | 'resolved' | 'closed';
}

// ──────────────────────────────────────────────────────────────────────────────
// JOBS
// ──────────────────────────────────────────────────────────────────────────────

export interface CreateJobDTO {
  title: string;
  department?: string;
  location?: string;
  type?: string;
  description?: string;
  requirements?: string[];
  isActive?: boolean;
}

export interface UpdateJobDTO {
  title?: string;
  department?: string;
  location?: string;
  type?: string;
  description?: string;
  requirements?: string[];
  isActive?: boolean;
}

// ──────────────────────────────────────────────────────────────────────────────
// JOB APPLICATIONS
// ──────────────────────────────────────────────────────────────────────────────

export interface CreateJobApplicationDTO {
  jobId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  resume?: string;
  coverLetter?: string;
  status?: 'submitted' | 'reviewed' | 'shortlisted' | 'rejected';
}

export interface UpdateJobApplicationDTO {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  resume?: string;
  coverLetter?: string;
  status?: 'submitted' | 'reviewed' | 'shortlisted' | 'rejected';
}

// ──────────────────────────────────────────────────────────────────────────────
// QUOTES
// ──────────────────────────────────────────────────────────────────────────────

export interface CreateQuoteDTO {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  quantity?: number;
  specifications?: string;
  message?: string;
  status?: 'new' | 'sent' | 'accepted' | 'rejected';
}

export interface UpdateQuoteDTO {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  quantity?: number;
  specifications?: string;
  message?: string;
  status?: 'new' | 'sent' | 'accepted' | 'rejected';
}

// ──────────────────────────────────────────────────────────────────────────────
// SETTINGS
// ──────────────────────────────────────────────────────────────────────────────

export interface CreateSettingDTO {
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
}

export interface UpdateSettingDTO {
  companyName?: string;
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
}

// ──────────────────────────────────────────────────────────────────────────────
// TESTIMONIALS
// ──────────────────────────────────────────────────────────────────────────────

export interface CreateTestimonialDTO {
  name: string;
  company?: string;
  role?: string;
  message: string;
  rating?: number;
  image?: string;
  isActive?: boolean;
}

export interface UpdateTestimonialDTO {
  name?: string;
  company?: string;
  role?: string;
  message?: string;
  rating?: number;
  image?: string;
  isActive?: boolean;
}

// ──────────────────────────────────────────────────────────────────────────────
// ASSETS
// ──────────────────────────────────────────────────────────────────────────────

export interface CreateAssetDTO {
  name: string;
  type: 'image' | 'video' | 'document';
  url: string;
  size?: number;
  mimeType?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateAssetDTO {
  name?: string;
  type?: 'image' | 'video' | 'document';
  url?: string;
  size?: number;
  mimeType?: string;
  metadata?: Record<string, unknown>;
}
