import { z } from 'zod';

export const createIndustrySchema = z.object({
  body: z.object({})
});

export const updateIndustrySchema = z.object({
  body: z.object({}).partial()
});

export const IndustryValidation = {
  createIndustrySchema,
  updateIndustrySchema
};
