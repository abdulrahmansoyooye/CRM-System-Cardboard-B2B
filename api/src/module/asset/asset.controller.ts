import sendResponse from '../../core/response/sendResponse';
import { responseCache, getCacheKey, purgeByPrefix } from '../../core/response/responseCache';
import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../../utils/asyncHandler';
import { AssetService } from './asset.service';

const CACHE_TTL = 60;

export const create = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const file = req.file;
  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

  const doc = await AssetService.createAsset(body, file);
  purgeByPrefix('GET:/api/v1/assets');
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Asset registered successfully',
    data: doc
  });
});

export const getAll = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const cacheKey = getCacheKey(req);
  const cached = responseCache.get(cacheKey);
  if (cached) {
    return sendResponse(res, cached as any);
  }

  const { result, meta } = await AssetService.getAllAssets(req.query);
  responseCache.set(cacheKey, { statusCode: 200, success: true, message: 'Success', meta, data: result }, CACHE_TTL);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Success',
    meta,
    data: result
  });
});

export const deleteDoc = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await AssetService.deleteAsset(req.params.id as string);
  purgeByPrefix('GET:/api/v1/assets');
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Asset deleted permanently',
    data: doc
  });
});

export const AssetController = { create, getAll, deleteDoc };
