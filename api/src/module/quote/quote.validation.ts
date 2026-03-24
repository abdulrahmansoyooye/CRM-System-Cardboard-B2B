import { z } from 'zod';

export const createQuoteSchema = z.object({
  body: z.object({})
});

export const updateQuoteSchema = z.object({
  body: z.object({}).partial()
});

export const QuoteValidation = {
  createQuoteSchema,
  updateQuoteSchema
};
