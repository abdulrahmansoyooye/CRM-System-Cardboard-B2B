import { z } from 'zod';

export const createJobSchema = z.object({
  body: z.object({
    title: z.string({ message: 'Title is required' }),
    department: z.string().optional(),
    experience: z.string().optional(),
    location: z.string().optional(),
    description: z.string().optional(),
    status: z.enum(['open', 'closed']).default('open'),
  }),
});

export const updateJobSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    department: z.string().optional(),
    experience: z.string().optional(),
    location: z.string().optional(),
    description: z.string().optional(),
    status: z.enum(['open', 'closed']).optional(),
  }),
});

export const JobValidation = {
  createJobSchema,
  updateJobSchema,
};
