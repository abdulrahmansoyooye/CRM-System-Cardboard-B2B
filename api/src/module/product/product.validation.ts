import { z } from 'zod';

const createProductSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Product name is required' }).min(3),
    categoryId: z.string({ required_error: 'Category ID is required' }),
    shortDescription: z.string().optional(),
    fullDescription: z.string().optional(),
    specifications: z.array(z.string()).optional(),
    materialDetails: z.string().optional(),
    moq: z.number().min(1).default(1),
    deliveryTimeline: z.string().optional(),
    isFeatured: z.boolean().default(false),
    images: z.array(z.string()).min(1, 'At least one image is required'),
    seo: z
      .object({
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
      })
      .optional(),
    isActive: z.boolean().default(true),
  }),
});

const updateProductSchema = z.object({
  body: z.object({
    name: z.string().min(3).optional(),
    categoryId: z.string().optional(),
    shortDescription: z.string().optional(),
    fullDescription: z.string().optional(),
    specifications: z.array(z.string()).optional(),
    materialDetails: z.string().optional(),
    moq: z.number().min(1).optional(),
    deliveryTimeline: z.string().optional(),
    isFeatured: z.boolean().optional(),
    images: z.array(z.string()).min(1).optional(),
    seo: z
      .object({
        metaTitle: z.string().optional(),
        metaDescription: z.string().optional(),
      })
      .optional(),
    isActive: z.boolean().optional(),
  }),
});

export const ProductValidation = {
  createProductSchema,
  updateProductSchema,
};