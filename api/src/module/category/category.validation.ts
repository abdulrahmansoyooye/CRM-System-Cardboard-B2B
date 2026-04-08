import { z } from 'zod';

const createCategorySchema = z.object({
  body: z.object({
    name: z.string(),
    slug: z.string().optional(),
    description: z.string().optional(),
    coverImage: z.string().optional(),
    seo: z.object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
    }).optional(),
    isActive: z.boolean().optional(),
  }),
});

const updateCategorySchema = z.object({
  body: z.object({
    name: z.string().optional(),
    slug: z.string().optional(),
    description: z.string().optional(),
    coverImage: z.string().optional(),
    seo: z.object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
    }).optional(),
    isActive: z.boolean().optional(),
  }),
});

export const CategoryValidation = {
  createCategorySchema,
  updateCategorySchema,
};
