import sendResponse from '../../core/response/sendResponse';
import { responseCache, getCacheKey, purgeByPrefix } from '../../core/response/responseCache';
import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../../utils/asyncHandler';
import { TestimonialService } from './testimonial.service';

const CACHE_TTL = 300;

export const create = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await TestimonialService.createTestimonial(req.body);
  purgeByPrefix('GET:/api/v1/testimonials');
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Created successfully',
    data: doc
  });
});

export const getAll = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const cacheKey = getCacheKey(req);
  const cached = responseCache.get(cacheKey);
  if (cached) {
    return sendResponse(res, cached as any);
  }

  const { result, meta } = await TestimonialService.getAllTestimonials(req.query);
  responseCache.set(cacheKey, { statusCode: 200, success: true, message: 'Success', meta, data: result }, CACHE_TTL);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Success',
    meta,
    data: result
  });
});
export const getById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const cacheKey = getCacheKey(req);
  const cached = responseCache.get(cacheKey);
  if (cached) {
    return sendResponse(res, cached as any);
  }

  const doc = await TestimonialService.getTestimonialById(req.params.id as string as string);
  responseCache.set(cacheKey, { statusCode: 200, success: true, message: 'Success', data: doc }, CACHE_TTL);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Success',
    data: doc
  });
});
export const update = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await TestimonialService.updateTestimonial(req.params.id as string as string, req.body);
  purgeByPrefix('GET:/api/v1/testimonials');
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Updated successfully',
    data: doc
  });
});

export const deleteDoc = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await TestimonialService.deleteTestimonial(req.params.id as string as string);
  purgeByPrefix('GET:/api/v1/testimonials');
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Deleted successfully',
    data: doc
  });
});

export const TestimonialController = {
  create,
  getAll,
  getById,
  update,
  deleteDoc
};
