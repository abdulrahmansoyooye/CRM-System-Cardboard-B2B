export interface TBlog {
  _id: string;
  title: string;
  slug: string;
  category: string;
  coverImage?: string;
  excerpt?: string;
  content: string;
  createdAt: string;
}

export interface TProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price?: number;
  category: string;
  images: string[];
  features?: string[];
  specifications?: Record<string, string>;
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
  };
}
