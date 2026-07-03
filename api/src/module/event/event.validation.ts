import { z } from 'zod';

export const createEventSchema = z.object({
  body: z.object({
    title: z.string({ message: 'Title is required' }),
    description: z.string().optional(),
    eventDate: z.string().optional(),
    images: z.array(z.string()).optional(),
    isFeatured: z.boolean().default(false),
  }).strict(),
});

export const updateEventSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    eventDate: z.string().optional(),
    images: z.array(z.string()).optional(),
    isFeatured: z.boolean().optional(),
  }).strict(),
});

export const EventValidation = {
  createEventSchema,
  updateEventSchema,
};
