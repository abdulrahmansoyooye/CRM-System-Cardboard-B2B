import { z } from 'zod';

export const createTestimonialSchema = z.object({
  body: z.object({
    clientName: z.string({ message: 'Client name is required' }),
    company: z.string().optional(),
    feedback: z.string({ message: 'Feedback is required' }),
    rating: z.number().min(1).max(5).optional(),
    isPublished: z.boolean().default(false),
  }),
});

export const updateTestimonialSchema = z.object({
  body: z.object({
    clientName: z.string().optional(),
    company: z.string().optional(),
    feedback: z.string().optional(),
    rating: z.number().min(1).max(5).optional(),
    isPublished: z.boolean().optional(),
  }),
});

export const TestimonialValidation = {
  createTestimonialSchema,
  updateTestimonialSchema,
};
