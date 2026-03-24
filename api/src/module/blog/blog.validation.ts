import { z } from 'zod';

export const createBlogSchema = z.object({
  body: z.object({})
});

export const updateBlogSchema = z.object({
  body: z.object({}).partial()
});

export const BlogValidation = {
  createBlogSchema,
  updateBlogSchema
};
