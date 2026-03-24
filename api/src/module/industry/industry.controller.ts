import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../../utils/asyncHandler';
import { IndustryService } from './industry.service';

export const create = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await IndustryService.createIndustry(req.body);
  res.status(201).json({ success: true, message: 'Created successfully', data: doc });
});

export const getAll = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const docs = await IndustryService.getAllIndustrys();
  res.status(200).json({ success: true, data: docs });
});
export const getBySlug = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await IndustryService.getIndustryBySlug(req.params.slug);
  res.status(200).json({ success: true, data: doc });
});
export const update = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await IndustryService.updateIndustry(req.params.id as string, req.body);
  res.status(200).json({ success: true, message: 'Updated successfully', data: doc });
});

export const deleteDoc = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await IndustryService.deleteIndustry(req.params.id as string);
  res.status(200).json({ success: true, message: 'Deleted successfully', data: doc });
});

export const IndustryController = {
  create,
  getAll,
  getBySlug,
  update,
  deleteDoc
};
