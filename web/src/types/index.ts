export interface TBlog {
  _id: string;
  title: string;
  slug: string;
  category?: string;
  coverImage?: string;
  excerpt?: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  author?: string;
}

export interface TProduct {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  ply?: string;
  categoryId?: { _id: string; name: string };
  images?: string[];
  specifications?: string[];
  sizes?: string[];
  isActive?: boolean;
  isFeatured?: boolean;
  createdAt?: string;
}

export interface TCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface TIndustry {
  _id: string;
  name: string;
  slug: string;
  overview?: string;
  description?: string;
  images?: string[];
  relatedProducts?: TProduct[];
}

export interface TEvent {
  _id: string;
  title: string;
  description?: string;
  eventDate?: string;
  images?: string[];
  isFeatured?: boolean;
  isActive?: boolean;
  createdAt?: string;
}

export interface TJob {
  _id: string;
  title: string;
  department?: string;
  location?: string;
  type?: string;
  description?: string;
  requirements?: string[];
  isActive?: boolean;
  createdAt?: string;
}

export interface TTestimonial {
  _id: string;
  name: string;
  company?: string;
  role?: string;
  message: string;
  rating?: number;
  image?: string;
  isActive?: boolean;
}

export interface TSettings {
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
  contactInfo?: {
    phone?: string;
    email?: string;
    address?: string;
    exportCount?: string;
    establishedYear?: string;
    coordinates?: string;
    productionCapacity?: string;
    factoryArea?: string;
  };
}
