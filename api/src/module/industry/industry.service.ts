import { AppError } from '../../core/errors/AppError';
import { Industry } from './industry.model';

export const createIndustry = async (data: any) => { return await Industry.create(data); };
export const getAllIndustrys = async () => { return await Industry.find(); };
export const getIndustryBySlug = async (slug: string) => {
  const doc = await Industry.findOne({ slug });
  if (!doc) throw new AppError('Not found', 404);
  return doc;
};
export const updateIndustry = async (id: string, data: any) => {
  const doc = await Industry.findByIdAndUpdate(id, data, { new: true, runValidators: true });
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
