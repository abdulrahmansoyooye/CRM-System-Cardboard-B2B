import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../../utils/asyncHandler';
import { QuoteService } from './quote.service';

export const create = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await QuoteService.createQuote(req.body);
  res.status(201).json({ success: true, message: 'Created successfully', data: doc });
});

export const getAll = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const docs = await QuoteService.getAllQuotes();
  res.status(200).json({ success: true, data: docs });
});
export const getById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await QuoteService.getQuoteById(req.params.id);
  res.status(200).json({ success: true, data: doc });
});
export const update = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await QuoteService.updateQuote(req.params.id, req.body);
  res.status(200).json({ success: true, message: 'Updated successfully', data: doc });
});

export const deleteDoc = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await QuoteService.deleteQuote(req.params.id);
  res.status(200).json({ success: true, message: 'Deleted successfully', data: doc });
});

export const QuoteController = {
  create,
  getAll,
  getById,
  update,
  deleteDoc
};
