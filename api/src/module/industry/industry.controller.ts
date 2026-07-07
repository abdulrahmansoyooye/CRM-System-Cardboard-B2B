import sendResponse from '../../core/response/sendResponse';
import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../../utils/asyncHandler';
import { IndustryService } from './industry.service';

export const create = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await IndustryService.createIndustry(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Created successfully',
    data: doc
  });
});

export const getAll = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { result, meta } = await IndustryService.getAllIndustrys(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Success',
    meta,
    data: result
  });
});
export const getBySlug = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await IndustryService.getIndustryBySlug(req.params.slug as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Success',
    data: doc
  });
});
export const update = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await IndustryService.updateIndustry(req.params.id as string, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Updated successfully',
    data: doc
  });
});

export const deleteDoc = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await IndustryService.deleteIndustry(req.params.id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Deleted successfully',
    data: doc
  });
});

export const IndustryController = {
  create,
  getAll,
  getBySlug,
  update,
  deleteDoc
};
