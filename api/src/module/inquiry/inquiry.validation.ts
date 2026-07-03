import { z } from 'zod';

export const createInquirySchema = z.object({
  body: z.object({
    name: z.string({ message: 'Name is required' }),
    company: z.string().optional(),
    phone: z.string().optional(),
    email: z.string({ message: 'Email is required' }).email(),
    message: z.string().optional(),
    productInterested: z.string().optional(),
  }).strict(),
});

export const updateInquirySchema = z.object({
  body: z.object({
    name: z.string().optional(),
    company: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    message: z.string().optional(),
    status: z.enum(['new', 'contacted', 'quoted', 'closed']).optional(),
    notes: z.string().optional(),
    assignedTo: z.string().optional(),
  }).strict(),
});

export const InquiryValidation = {
  createInquirySchema,
  updateInquirySchema,
};
