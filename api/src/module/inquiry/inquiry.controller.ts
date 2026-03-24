import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../../utils/asyncHandler';
import { InquiryService } from './inquiry.service';

export const create = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await InquiryService.createInquiry(req.body);
  res.status(201).json({ success: true, message: 'Created successfully', data: doc });
});

export const getAll = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const docs = await InquiryService.getAllInquirys();
  res.status(200).json({ success: true, data: docs });
});
export const getById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await InquiryService.getInquiryById(req.params.id as string);
  res.status(200).json({ success: true, data: doc });
});
export const update = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await InquiryService.updateInquiry(req.params.id as string, req.body);
  res.status(200).json({ success: true, message: 'Updated successfully', data: doc });
});

export const deleteDoc = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await InquiryService.deleteInquiry(req.params.id as string);
  res.status(200).json({ success: true, message: 'Deleted successfully', data: doc });
});

export const InquiryController = {
  create,
  getAll,
  getById,
  update,
  deleteDoc
};
