import { z } from 'zod';

export const createQuoteSchema = z.object({
  body: z.object({
    productId: z.string().optional(),
    quantity: z.number().optional(),
    customizationDetails: z.string().optional(),
    deliveryLocation: z.string().optional(),
    name: z.string({ message: 'Name is required' }),
    phone: z.string().optional(),
    email: z.string({ message: 'Email is required' }).email(),
    notes: z.string().optional(),
  }).strict(),
});

export const updateQuoteSchema = z.object({
  body: z.object({
    productId: z.string().optional(),
    quantity: z.number().optional(),
    customizationDetails: z.string().optional(),
    deliveryLocation: z.string().optional(),
    name: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    status: z.string().optional(),
    notes: z.string().optional(),
  }).strict(),
});

export const QuoteValidation = {
  createQuoteSchema,
  updateQuoteSchema,
};
