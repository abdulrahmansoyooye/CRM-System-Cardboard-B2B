import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../../utils/asyncHandler';
import { AssetService } from './asset.service';

export const create = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await AssetService.createAsset(req.body);
  res.status(201).json({ success: true, message: 'Asset registered successfully', data: doc });
});

export const getAll = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const docs = await AssetService.getAllAssets();
  res.status(200).json({ success: true, data: docs });
});

export const deleteDoc = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await AssetService.deleteAsset(req.params.id as string);
  res.status(200).json({ success: true, message: 'Asset deleted permanently', data: doc });
});

export const AssetController = {
  create,
  getAll,
  deleteDoc
};
