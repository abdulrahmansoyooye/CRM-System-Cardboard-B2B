import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../../utils/asyncHandler';
import { BlogService } from './blog.service';

export const create = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await BlogService.createBlog(req.body);
  res.status(201).json({ success: true, message: 'Created successfully', data: doc });
});

export const getAll = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const docs = await BlogService.getAllBlogs();
  res.status(200).json({ success: true, data: docs });
});
export const getBySlug = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await BlogService.getBlogBySlug(req.params.slug);
  res.status(200).json({ success: true, data: doc });
});
export const update = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await BlogService.updateBlog(req.params.id, req.body);
  res.status(200).json({ success: true, message: 'Updated successfully', data: doc });
});

export const deleteDoc = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await BlogService.deleteBlog(req.params.id);
  res.status(200).json({ success: true, message: 'Deleted successfully', data: doc });
});

export const BlogController = {
  create,
  getAll,
  getBySlug,
  update,
  deleteDoc
};
