import { z } from 'zod';

export const createInquirySchema = z.object({
  body: z.object({})
});

export const updateInquirySchema = z.object({
  body: z.object({}).partial()
});

export const InquiryValidation = {
  createInquirySchema,
  updateInquirySchema
};
