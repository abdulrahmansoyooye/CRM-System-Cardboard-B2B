import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../../utils/asyncHandler';
import { JobService } from './job.service';

export const create = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await JobService.createJob(req.body);
  res.status(201).json({ success: true, message: 'Created successfully', data: doc });
});

export const getAll = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const docs = await JobService.getAllJobs();
  res.status(200).json({ success: true, data: docs });
});
export const getById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await JobService.getJobById(req.params.id as string);
  res.status(200).json({ success: true, data: doc });
});
export const update = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await JobService.updateJob(req.params.id as string, req.body);
  res.status(200).json({ success: true, message: 'Updated successfully', data: doc });
});

export const deleteDoc = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await JobService.deleteJob(req.params.id as string);
  res.status(200).json({ success: true, message: 'Deleted successfully', data: doc });
});

export const JobController = {
  create,
  getAll,
  getById,
  update,
  deleteDoc
};
