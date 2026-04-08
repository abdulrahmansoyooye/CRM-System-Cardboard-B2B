import { z } from 'zod';

export const createIndustrySchema = z.object({
  body: z.object({
    name: z.string({ message: 'Name is required' }),
    overview: z.string().optional(),
    relatedProducts: z.array(z.string()).optional(),
    images: z.array(z.string()).optional(),
    seo: z.object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
    }).optional(),
    isActive: z.boolean().default(true),
  }),
});

export const updateIndustrySchema = z.object({
  body: z.object({
    name: z.string().optional(),
    overview: z.string().optional(),
    relatedProducts: z.array(z.string()).optional(),
    images: z.array(z.string()).optional(),
    seo: z.object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
    }).optional(),
    isActive: z.boolean().optional(),
  }),
});

export const IndustryValidation = {
  createIndustrySchema,
  updateIndustrySchema,
};
