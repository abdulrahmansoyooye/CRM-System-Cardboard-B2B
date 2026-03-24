import { z } from 'zod';

export const createTestimonialSchema = z.object({
  body: z.object({})
});

export const updateTestimonialSchema = z.object({
  body: z.object({}).partial()
});

export const TestimonialValidation = {
  createTestimonialSchema,
  updateTestimonialSchema
};
