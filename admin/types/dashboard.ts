import type { IJobApplication } from "@/types/index";

export interface BaseEntity {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product extends BaseEntity {
  name: string;
  slug?: string;
  categoryId: Category | string;
  shortDescription?: string;
  fullDescription?: string;
  materialDetails?: string;
  strengthDetails?: string;
  availableSizes?: string[];
  moq: number;
  deliveryTimeline?: string;
  isFeatured: boolean;
  isActive: boolean;
  specifications?: string[];
  images?: string[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
}

export interface Category extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
  coverImage?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  isActive?: boolean;
}

export interface Blog extends BaseEntity {
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
  publishedAt?: string;
}

export interface Event extends BaseEntity {
  title: string;
  description?: string;
  eventDate?: string;
  images?: string[];
  isFeatured?: boolean;
}

export interface Industry extends BaseEntity {
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

export interface Job extends BaseEntity {
  title: string;
  department?: string;
  experience?: string;
  location?: string;
  type?: 'Full-Time' | 'Part-Time' | 'Shift Basis' | 'Contract';
  salary?: string;
  description?: string;
  status?: 'open' | 'closed';
}

export interface Inquiry extends BaseEntity {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  message?: string;
  productInterested?: string;
  status?: 'new' | 'contacted' | 'quoted' | 'closed';
}

export interface Gallery extends BaseEntity {
  name: string;
  url: string;
  category: string;
  type?: string;
  size?: string;
  dimensions?: string;
}

export interface Testimonial extends BaseEntity {
  clientName: string;
  company?: string;
  feedback: string;
  rating?: number;
  isPublished?: boolean;
}

export interface Setting extends BaseEntity {
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
}

export type ApplicationStatus = "New" | "Reviewed" | "Shortlisted" | "Rejected" | "Hired";

export interface Application extends Omit<IJobApplication, "jobId" | "status"> {
  name: string;
  jobId: {
    _id: string;
    title: string;
  };
  notes?: string;
  status: ApplicationStatus;
}

export interface Quote extends BaseEntity {
  productId?: string;
  quantity?: number;
  customizationDetails?: string;
  deliveryLocation?: string;
  name: string;
  phone?: string;
  email: string;
  status?: string;
  notes?: string;
}
