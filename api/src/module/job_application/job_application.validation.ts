import { z } from 'zod';

export const createJob_applicationSchema = z.object({
  body: z.object({
    jobId: z.string({ message: 'Job ID is required' }),
    name: z.string({ message: 'Name is required' }),
    email: z.string({ message: 'Email is required' }).email(),
    phone: z.string().optional(),
    resumeFile: z.string().optional(),
    status: z.enum(['new', 'reviewed', 'shortlisted', 'rejected']).default('new'),
  }),
});

export const updateJob_applicationSchema = z.object({
  body: z.object({
    jobId: z.string().optional(),
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    resumeFile: z.string().optional(),
    status: z.enum(['new', 'reviewed', 'shortlisted', 'rejected']).optional(),
    notes: z.string().optional(),
  }),
});

export const Job_applicationValidation = {
  createJob_applicationSchema,
  updateJob_applicationSchema,
};
