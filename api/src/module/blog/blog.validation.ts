import { z } from 'zod';

export const createBlogSchema = z.object({
  body: z.object({
    title: z.string({ message: 'Title is required' }),
    category: z.string().optional(),
    excerpt: z.string().optional(),
    content: z.string().optional(),
    featuredImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
    seo: z.object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
    }).strict().optional(),
    status: z.enum(['draft', 'published']).default('draft'),
  }).strict(),
});

export const updateBlogSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    category: z.string().optional(),
    excerpt: z.string().optional(),
    content: z.string().optional(),
    featuredImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
    seo: z.object({
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
    }).strict().optional(),
    status: z.enum(['draft', 'published']).optional(),
  }).strict(),
});

export const BlogValidation = {
  createBlogSchema,
  updateBlogSchema,
};
