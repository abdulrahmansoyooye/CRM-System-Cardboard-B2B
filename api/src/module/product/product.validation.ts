import { z } from 'zod';

const createProductSchema = z.object({
  body: z.object({
    name: z.string({ message: 'Product name is required' }).min(3),
    categoryId: z.string({ message: 'Category ID is required' }),
    shortDescription: z.string().optional(),
    fullDescription: z.string().optional(),
    specifications: z.array(z.string()).optional(),
    materialDetails: z.string().optional(),
    strengthDetails: z.string().optional(),
    availableSizes: z.array(z.string()).optional(),
    moq: z.number().min(1).default(1),
    deliveryTimeline: z.string().optional(),
    isFeatured: z.boolean().default(false),
    images: z.array(z.string()).optional(),
    seo: z
      .object({
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
      }).strict()
      .optional(),
    isActive: z.boolean().default(true),
  }).strict(),
});

const updateProductSchema = z.object({
  body: z.object({
    name: z.string().min(3).optional(),
    categoryId: z.string().optional(),
    shortDescription: z.string().optional(),
    fullDescription: z.string().optional(),
    specifications: z.array(z.string()).optional(),
    materialDetails: z.string().optional(),
    strengthDetails: z.string().optional(),
    availableSizes: z.array(z.string()).optional(),
    moq: z.number().min(1).optional(),
    deliveryTimeline: z.string().optional(),
    isFeatured: z.boolean().optional(),
    images: z.array(z.string()).min(1).optional(),
    seo: z
      .object({
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
      }).strict()
      .optional(),
    isActive: z.boolean().optional(),
  }).strict(),
});

export const ProductValidation = {
  createProductSchema,
  updateProductSchema,
};