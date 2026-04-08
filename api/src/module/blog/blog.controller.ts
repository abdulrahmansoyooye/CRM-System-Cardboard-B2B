import sendResponse from '../../core/response/sendResponse';
import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../../utils/asyncHandler';
import { BlogService } from './blog.service';

export const create = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await BlogService.createBlog(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Created successfully',
    data: doc
  });
});

export const getAll = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const docs = await BlogService.getAllBlogs();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Success',
    data: docs
  });
});
export const getBySlug = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await BlogService.getBlogBySlug(req.params.slug as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Success',
    data: doc
  });
});
export const update = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await BlogService.updateBlog(req.params.id as string, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Updated successfully',
    data: doc
  });
});

export const deleteDoc = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await BlogService.deleteBlog(req.params.id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Deleted successfully',
    data: doc
  });
});

export const BlogController = {
  create,
  getAll,
  getBySlug,
  update,
  deleteDoc
};
