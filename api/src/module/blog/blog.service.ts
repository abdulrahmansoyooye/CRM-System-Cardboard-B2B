import { AppError } from '../../core/errors/AppError';
import { generateSlug } from '../../utils/slug';
import { Blog } from './blog.model';

export const createBlog = async (data: any) => { 
  if (data.title) data.slug = generateSlug(data.title);
  if (data.status === 'published' && !data.publishedAt) data.publishedAt = new Date();
  return await Blog.create(data); 
};
export const getAllBlogs = async () => { return await Blog.find(); };
export const getBlogBySlug = async (slug: string) => {
  const doc = await Blog.findOne({ slug });
  if (!doc) throw new AppError('Not found', 404);
  return doc;
};
export const updateBlog = async (id: string, data: any) => {
  if (data.title) data.slug = generateSlug(data.title);
  if (data.status === 'published' && !data.publishedAt) data.publishedAt = new Date();
  const doc = await Blog.findByIdAndUpdate(id, data, { new: true, runValidators: true });
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
