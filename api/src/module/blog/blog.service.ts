import { AppError } from '../../core/errors/AppError';
import { generateSlug } from '../../utils/slug';
import { sanitizeContentData } from '../../utils/sanitize';
import { CreateBlogDTO, UpdateBlogDTO } from '../../types/dtos';
import { Blog } from './blog.model';
import { getPaginationParams } from '../../utils/pagination';

export const createBlog = async (data: CreateBlogDTO) => { 
  const sanitized = sanitizeContentData(data);
  if (sanitized.title) sanitized.slug = generateSlug(sanitized.title as string);
  if (sanitized.status === 'published' && !sanitized.publishedAt) sanitized.publishedAt = new Date();
  return await Blog.create(sanitized); 
};
export const getAllBlogs = async (query: Record<string, unknown>) => {
  const { page, limit, skip } = getPaginationParams(query);
  const [result, total] = await Promise.all([
    Blog.find().skip(skip).limit(limit),
    Blog.countDocuments(),
  ]);
  return { result, meta: { page, limit, total, totalPage: Math.ceil(total / limit) } };
};
export const getBlogBySlug = async (slug: string) => {
  const doc = await Blog.findOne({ slug });
  if (!doc) throw new AppError('Not found', 404);
  return doc;
};
export const updateBlog = async (id: string, data: UpdateBlogDTO) => {
  const sanitized = sanitizeContentData(data);
  if (sanitized.title) sanitized.slug = generateSlug(sanitized.title as string);
  if (sanitized.status === 'published' && !sanitized.publishedAt) sanitized.publishedAt = new Date();
  const doc = await Blog.findByIdAndUpdate(id, sanitized, { new: true, runValidators: true });
  if (!doc) throw new AppError('Not found', 404);
  return doc;
};

export const deleteBlog = async (id: string) => {
  const doc = await Blog.findByIdAndDelete(id);
  if (!doc) throw new AppError('Not found', 404);
  return doc;
};

export const BlogService = {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog
};
