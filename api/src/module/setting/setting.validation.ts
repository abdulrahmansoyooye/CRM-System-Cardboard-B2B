import { z } from 'zod';

export const createSettingSchema = z.object({
  body: z.object({})
});

export const updateSettingSchema = z.object({
  body: z.object({}).partial()
});

export const SettingValidation = {
  createSettingSchema,
  updateSettingSchema
};
