import { AppError } from '../../core/errors/AppError';
import { generateSlug } from '../../utils/slug';
import { sanitizeContentData } from '../../utils/sanitize';
import { CreateIndustryDTO, UpdateIndustryDTO } from '../../types/dtos';
import { Industry } from './industry.model';

export const createIndustry = async (data: CreateIndustryDTO) => { 
  const sanitized = sanitizeContentData(data);
  if (sanitized.name) sanitized.slug = generateSlug(sanitized.name as string);
  return await Industry.create(sanitized); 
};
export const getAllIndustrys = async () => { return await Industry.find().populate('relatedProducts'); };
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
