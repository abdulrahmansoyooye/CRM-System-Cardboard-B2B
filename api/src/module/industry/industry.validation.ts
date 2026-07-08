import { z } from 'zod';

export const createIndustrySchema = z.object({
  body: z.object({
    name: z.string({ message: 'Name is required' }),
    slug: z.string().optional(),
    overview: z.string().optional(),
    relatedProducts: z.array(z.string()).optional(),
    images: z.array(z.string()).optional(),
    seo: z.object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
    }).strict().optional(),
    isActive: z.boolean().default(true),
  }).strict(),
});

export const updateIndustrySchema = z.object({
  body: z.object({
    name: z.string().optional(),
    slug: z.string().optional(),
    overview: z.string().optional(),
    relatedProducts: z.array(z.string()).optional(),
    images: z.array(z.string()).optional(),
    seo: z.object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
    }).strict().optional(),
    isActive: z.boolean().optional(),
  }).strict(),
});

export const IndustryValidation = {
  createIndustrySchema,
  updateIndustrySchema,
};
