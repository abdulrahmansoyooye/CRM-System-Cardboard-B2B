import sendResponse from '../../core/response/sendResponse';
import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../../utils/asyncHandler';
import { InquiryService } from './inquiry.service';

export const create = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await InquiryService.createInquiry(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Created successfully',
    data: doc
  });
});

export const getAll = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { result, meta } = await InquiryService.getAllInquirys(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Success',
    meta,
    data: result
  });
});
export const getById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await InquiryService.getInquiryById(req.params.id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Success',
    data: doc
  });
});
export const update = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await InquiryService.updateInquiry(req.params.id as string, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Updated successfully',
    data: doc
  });
});

export const deleteDoc = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await InquiryService.deleteInquiry(req.params.id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Deleted successfully',
    data: doc
  });
});

export const InquiryController = {
  create,
  getAll,
  getById,
  update,
  deleteDoc
};
