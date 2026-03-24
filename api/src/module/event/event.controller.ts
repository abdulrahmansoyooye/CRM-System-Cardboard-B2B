import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../../utils/asyncHandler';
import { EventService } from './event.service';

export const create = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await EventService.createEvent(req.body);
  res.status(201).json({ success: true, message: 'Created successfully', data: doc });
});

export const getAll = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const docs = await EventService.getAllEvents();
  res.status(200).json({ success: true, data: docs });
});
export const getById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await EventService.getEventById(req.params.id as string);
  res.status(200).json({ success: true, data: doc });
});
export const update = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await EventService.updateEvent(req.params.id as string, req.body);
  res.status(200).json({ success: true, message: 'Updated successfully', data: doc });
});

export const deleteDoc = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await EventService.deleteEvent(req.params.id as string);
  res.status(200).json({ success: true, message: 'Deleted successfully', data: doc });
});

export const EventController = {
  create,
  getAll,
  getById,
  update,
  deleteDoc
};
