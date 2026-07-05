import type { IJobApplication } from "@/types/index";

export interface BaseEntity {
  _id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product extends BaseEntity {
  name: string;
  categoryId: Category | string;
  moq: number;
  deliveryTimeline: string;
  isFeatured: boolean;
  isActive: boolean;
  shortDescription?: string;
  fullDescription?: string;
  materialDetails?: string;
  specifications?: string[];
  images?: string[];
}

export interface Category extends BaseEntity {
  name: string;
  description?: string;
  slug: string;
}

export interface Blog extends BaseEntity {
  title: string;
  slug: string;
  content: string;
  author: string;
  category: string;
  image?: string;
  isPublished: boolean;
}

export interface Event extends BaseEntity {
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  image?: string;
  isActive: boolean;
}

export interface Industry extends BaseEntity {
  name: string;
  description: string;
  slug: string;
  image?: string;
  isActive: boolean;
}

export interface Job extends BaseEntity {
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  description: string;
  requirements: string[];
  isActive: boolean;
}

export interface Inquiry extends BaseEntity {
  name: string;
  company?: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "Pending" | "InProgress" | "Resolved" | "Archived";
}

export interface Gallery extends BaseEntity {
  title: string;
  image: string;
  category: string;
  isActive: boolean;
}

export interface Testimonial extends BaseEntity {
  name: string;
  position: string;
  company: string;
  content: string;
  image?: string;
  rating: number;
  isActive: boolean;
}

export interface Setting extends BaseEntity {
  key: string;
  value: unknown;
  description?: string;
}

export type ApplicationStatus = "New" | "Reviewed" | "Shortlisted" | "Rejected" | "Hired";

export interface Application extends Omit<IJobApplication, "firstName" | "lastName" | "jobId" | "status"> {
  name: string;
  jobId: {
    _id: string;
    title: string;
  };
  notes?: string;
  status: ApplicationStatus;
}

export interface Quote extends BaseEntity {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  productType: string;
  quantity: string;
  details: string;
  status: string;
  internalNotes?: string;
}
