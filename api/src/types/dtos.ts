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
  name: string;
  email: string;
  password: string;
  role?: 'super_admin' | 'admin' | 'content_manager' | 'hr_manager' | 'sales_manager';
  isActive?: boolean;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  role?: 'super_admin' | 'admin' | 'content_manager' | 'hr_manager' | 'sales_manager';
  isActive?: boolean;
}

export interface LoginPayloadDTO {
  email: string;
  password: string;
}

export interface UserResponseDTO {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLogin: Date;
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
  categoryId: string;
  specifications?: string[];
  materialDetails?: string;
  strengthDetails?: string;
  availableSizes?: string[];
  moq?: number;
  deliveryTimeline?: string;
  isFeatured?: boolean;
  images?: string[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  isActive?: boolean;
}

export interface UpdateProductDTO {
  name?: string;
  slug?: string;
  shortDescription?: string;
  fullDescription?: string;
  categoryId?: string;
  specifications?: string[];
  materialDetails?: string;
  strengthDetails?: string;
  availableSizes?: string[];
  moq?: number;
  deliveryTimeline?: string;
  isFeatured?: boolean;
  images?: string[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  isActive?: boolean;
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
  coverImage?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  isActive?: boolean;
}

export interface UpdateCategoryDTO {
  name?: string;
  slug?: string;
  description?: string;
  coverImage?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  isActive?: boolean;
}

// ──────────────────────────────────────────────────────────────────────────────
// EVENTS
// ──────────────────────────────────────────────────────────────────────────────

export interface CreateEventDTO {
  title: string;
  description?: string;
  eventDate?: Date;
  images?: string[];
  isFeatured?: boolean;
}

export interface UpdateEventDTO {
  title?: string;
  description?: string;
  eventDate?: Date;
  images?: string[];
  isFeatured?: boolean;
}

// ──────────────────────────────────────────────────────────────────────────────
// INDUSTRIES
// ──────────────────────────────────────────────────────────────────────────────

export interface CreateIndustryDTO {
  name: string;
  slug?: string;
  overview?: string;
  images?: string[];
  relatedProducts?: string[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  isActive?: boolean;
}

export interface UpdateIndustryDTO {
  name?: string;
  slug?: string;
  overview?: string;
  images?: string[];
  relatedProducts?: string[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  isActive?: boolean;
}

// ──────────────────────────────────────────────────────────────────────────────
// INQUIRIES
// ──────────────────────────────────────────────────────────────────────────────

export interface CreateInquiryDTO {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  productInterested?: string;
}

export interface UpdateInquiryDTO {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  productInterested?: string;
  status?: 'new' | 'contacted' | 'quoted' | 'closed';
  assignedTo?: string;
  notes?: string;
}

// ──────────────────────────────────────────────────────────────────────────────
// JOBS
// ──────────────────────────────────────────────────────────────────────────────

export interface CreateJobDTO {
  title: string;
  department?: string;
  experience?: string;
  location?: string;
  type?: 'Full-Time' | 'Part-Time' | 'Shift Basis' | 'Contract';
  salary?: string;
  description?: string;
  status?: 'open' | 'closed';
}

export interface UpdateJobDTO {
  title?: string;
  department?: string;
  experience?: string;
  location?: string;
  type?: 'Full-Time' | 'Part-Time' | 'Shift Basis' | 'Contract';
  salary?: string;
  description?: string;
  status?: 'open' | 'closed';
}

// ──────────────────────────────────────────────────────────────────────────────
// JOB APPLICATIONS
// ──────────────────────────────────────────────────────────────────────────────

export interface CreateJobApplicationDTO {
  jobId: string;
  name: string;
  email: string;
  phone: string;
  resumeFile?: string;
  status?: 'new' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
  notes?: string;
}

export interface UpdateJobApplicationDTO {
  jobId?: string;
  name?: string;
  email?: string;
  phone?: string;
  resumeFile?: string;
  status?: 'new' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
  notes?: string;
}

// ──────────────────────────────────────────────────────────────────────────────
// QUOTES
// ──────────────────────────────────────────────────────────────────────────────

export interface CreateQuoteDTO {
  productId?: string;
  quantity?: number;
  customizationDetails?: string;
  deliveryLocation?: string;
  name: string;
  phone?: string;
  email: string;
  notes?: string;
}

export interface UpdateQuoteDTO {
  productId?: string;
  quantity?: number;
  customizationDetails?: string;
  deliveryLocation?: string;
  name?: string;
  phone?: string;
  email?: string;
  status?: string;
  notes?: string;
}

// ──────────────────────────────────────────────────────────────────────────────
// SETTINGS
// ──────────────────────────────────────────────────────────────────────────────

export interface CreateSettingDTO {
  companyName?: string;
  tagline?: string;
  logo?: string;
  favicon?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  defaultSEO?: {
    metaTitle?: string;
    metaDescription?: string;
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
}

export interface UpdateSettingDTO {
  companyName?: string;
  tagline?: string;
  logo?: string;
  favicon?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  defaultSEO?: {
    metaTitle?: string;
    metaDescription?: string;
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
}

// ──────────────────────────────────────────────────────────────────────────────
// TESTIMONIALS
// ──────────────────────────────────────────────────────────────────────────────

export interface CreateTestimonialDTO {
  clientName: string;
  company?: string;
  feedback: string;
  rating?: number;
  isPublished?: boolean;
}

export interface UpdateTestimonialDTO {
  clientName?: string;
  company?: string;
  feedback?: string;
  rating?: number;
  isPublished?: boolean;
}

// ──────────────────────────────────────────────────────────────────────────────
// ASSETS
// ──────────────────────────────────────────────────────────────────────────────

export interface CreateAssetDTO {
  name: string;
  category?: string;
  url: string;
  size?: string;
  dimensions?: string;
  type?: string;
  mimeType?: string;
}

export interface UpdateAssetDTO {
  name?: string;
  category?: string;
  url?: string;
  size?: string;
  dimensions?: string;
  type?: string;
  mimeType?: string;
}
