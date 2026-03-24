import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../../utils/asyncHandler';
import { TestimonialService } from './testimonial.service';

export const create = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await TestimonialService.createTestimonial(req.body);
  res.status(201).json({ success: true, message: 'Created successfully', data: doc });
});

export const getAll = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const docs = await TestimonialService.getAllTestimonials();
  res.status(200).json({ success: true, data: docs });
});
export const getById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await TestimonialService.getTestimonialById(req.params.id as string as string);
  res.status(200).json({ success: true, data: doc });
});
export const update = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await TestimonialService.updateTestimonial(req.params.id as string as string, req.body);
  res.status(200).json({ success: true, message: 'Updated successfully', data: doc });
});

export const deleteDoc = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await TestimonialService.deleteTestimonial(req.params.id as string as string);
  res.status(200).json({ success: true, message: 'Deleted successfully', data: doc });
});

export const TestimonialController = {
  create,
  getAll,
  getById,
  update,
  deleteDoc
};
