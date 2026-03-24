import { z } from 'zod';

export const createEventSchema = z.object({
  body: z.object({})
});

export const updateEventSchema = z.object({
  body: z.object({}).partial()
});

export const EventValidation = {
  createEventSchema,
  updateEventSchema
};
