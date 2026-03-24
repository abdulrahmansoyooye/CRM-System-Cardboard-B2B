import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../../utils/asyncHandler';
import { SettingService } from './setting.service';

export const create = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await SettingService.createSetting(req.body);
  res.status(201).json({ success: true, message: 'Created successfully', data: doc });
});

export const getAll = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const docs = await SettingService.getAllSettings();
  res.status(200).json({ success: true, data: docs });
});
export const getById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await SettingService.getSettingById(req.params.id as string as string);
  res.status(200).json({ success: true, data: doc });
});
export const update = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await SettingService.updateSetting(req.params.id as string as string, req.body);
  res.status(200).json({ success: true, message: 'Updated successfully', data: doc });
});

export const deleteDoc = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await SettingService.deleteSetting(req.params.id as string as string);
  res.status(200).json({ success: true, message: 'Deleted successfully', data: doc });
});

export const SettingController = {
  create,
  getAll,
  getById,
  update,
  deleteDoc
};
