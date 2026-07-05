import sendResponse from '../../core/response/sendResponse';
import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../../utils/asyncHandler';
import { AssetService } from './asset.service';

export const create = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const file = req.file;
  const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

  const doc = await AssetService.createAsset(body, file);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Asset registered successfully',
    data: doc
  });
});

export const getAll = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const docs = await AssetService.getAllAssets();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Success',
    data: docs
  });
});

export const deleteDoc = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await AssetService.deleteAsset(req.params.id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Asset deleted permanently',
    data: doc
  });
});

export const AssetController = { create, getAll, deleteDoc };
