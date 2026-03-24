import { z } from 'zod';

export const createJob_applicationSchema = z.object({
  body: z.object({})
});

export const updateJob_applicationSchema = z.object({
  body: z.object({}).partial()
});

export const Job_applicationValidation = {
  createJob_applicationSchema,
  updateJob_applicationSchema
};
