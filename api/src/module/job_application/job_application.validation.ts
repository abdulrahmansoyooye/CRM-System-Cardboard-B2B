import { z } from 'zod';

export const createJob_applicationSchema = z.object({
  body: z.object({
    jobId: z.string({ message: 'Job ID is required' }),
    name: z.string({ message: 'Name is required' }),
    email: z.string({ message: 'Email is required' }).email(),
    phone: z.string().optional(),
    resumeFile: z.string().optional(),
    notes: z.string().optional(),
    status: z.enum(['new', 'reviewed', 'shortlisted', 'rejected', 'hired']).default('new'),
  }).strict(),
});

export const updateJob_applicationSchema = z.object({
  body: z.object({
    jobId: z.string().optional(),
    name: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    resumeFile: z.string().optional(),
    status: z.enum(['new', 'reviewed', 'shortlisted', 'rejected', 'hired']).optional(),
    notes: z.string().optional(),
  }).strict(),
});

export const Job_applicationValidation = {
  createJob_applicationSchema,
  updateJob_applicationSchema,
};
