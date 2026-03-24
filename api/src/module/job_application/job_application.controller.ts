import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../../utils/asyncHandler';
import { Job_applicationService } from './job_application.service';

export const create = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await Job_applicationService.createJob_application(req.body);
  res.status(201).json({ success: true, message: 'Created successfully', data: doc });
});

export const getAll = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const docs = await Job_applicationService.getAllJob_applications();
  res.status(200).json({ success: true, data: docs });
});
export const getById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await Job_applicationService.getJob_applicationById(req.params.id as string);
  res.status(200).json({ success: true, data: doc });
});
export const update = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await Job_applicationService.updateJob_application(req.params.id as string, req.body);
  res.status(200).json({ success: true, message: 'Updated successfully', data: doc });
});

export const deleteDoc = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await Job_applicationService.deleteJob_application(req.params.id as string);
  res.status(200).json({ success: true, message: 'Deleted successfully', data: doc });
});

export const Job_applicationController = {
  create,
  getAll,
  getById,
  update,
  deleteDoc
};
