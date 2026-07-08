import sendResponse from '../../core/response/sendResponse';
import { responseCache, getCacheKey, purgeByPrefix } from '../../core/response/responseCache';
import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../../utils/asyncHandler';
import { QuoteService } from './quote.service';

const CACHE_TTL = 60;

export const create = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await QuoteService.createQuote(req.body);
  purgeByPrefix('GET:/api/v1/quotes');
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

  const { result, meta } = await QuoteService.getAllQuotes(req.query);
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

  const doc = await QuoteService.getQuoteById(req.params.id as string);
  responseCache.set(cacheKey, { statusCode: 200, success: true, message: 'Success', data: doc }, CACHE_TTL);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Success',
    data: doc
  });
});
export const update = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await QuoteService.updateQuote(req.params.id as string, req.body);
  purgeByPrefix('GET:/api/v1/quotes');
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Updated successfully',
    data: doc
  });
});

export const deleteDoc = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await QuoteService.deleteQuote(req.params.id as string);
  purgeByPrefix('GET:/api/v1/quotes');
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Deleted successfully',
    data: doc
  });
});

export const QuoteController = {
  create,
  getAll,
  getById,
  update,
  deleteDoc
};
