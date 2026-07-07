import { AppError } from '../../core/errors/AppError';
import { generateSlug } from '../../utils/slug';
import { sanitizeContentData } from '../../utils/sanitize';
import { CreateIndustryDTO, UpdateIndustryDTO } from '../../types/dtos';
import { Industry } from './industry.model';
import { getPaginationParams } from '../../utils/pagination';

export const createIndustry = async (data: CreateIndustryDTO) => { 
  const sanitized = sanitizeContentData(data);
  if (sanitized.name) sanitized.slug = generateSlug(sanitized.name as string);
  return await Industry.create(sanitized); 
};
export const getAllIndustrys = async (query: Record<string, unknown>) => {
  const { page, limit, skip } = getPaginationParams(query);
  const [result, total] = await Promise.all([
    Industry.find().populate('relatedProducts').skip(skip).limit(limit),
    Industry.countDocuments(),
  ]);
  return { result, meta: { page, limit, total, totalPage: Math.ceil(total / limit) } };
};
export const getIndustryBySlug = async (slug: string) => {
  const doc = await Industry.findOne({ slug }).populate('relatedProducts');
  if (!doc) throw new AppError('Not found', 404);
  return doc;
};
export const updateIndustry = async (id: string, data: UpdateIndustryDTO) => {
  const sanitized = sanitizeContentData(data);
  if (sanitized.name) sanitized.slug = generateSlug(sanitized.name as string);
  const doc = await Industry.findByIdAndUpdate(id, sanitized, { new: true, runValidators: true });
  if (!doc) throw new AppError('Not found', 404);
  return doc;
};

export const deleteIndustry = async (id: string) => {
  const doc = await Industry.findByIdAndDelete(id);
  if (!doc) throw new AppError('Not found', 404);
  return doc;
};

export const IndustryService = {
  createIndustry,
  getAllIndustrys,
  getIndustryBySlug,
  updateIndustry,
  deleteIndustry
};
