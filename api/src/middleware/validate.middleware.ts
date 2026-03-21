import { ZodSchema } from 'zod';
import asyncHandler from '../utils/asyncHandler';

export const validateRequest = (schema: ZodSchema) => {
  return asyncHandler(async (req, res, next) => {
    await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
      cookies: req.cookies,
    });
    next();
  });
};

