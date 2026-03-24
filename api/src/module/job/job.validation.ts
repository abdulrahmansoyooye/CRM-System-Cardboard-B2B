import { z } from 'zod';

export const createJobSchema = z.object({
  body: z.object({})
});

export const updateJobSchema = z.object({
  body: z.object({}).partial()
});

export const JobValidation = {
  createJobSchema,
  updateJobSchema
};
