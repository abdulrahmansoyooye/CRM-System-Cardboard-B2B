import { AppError } from '../../core/errors/AppError';
import { Inquiry } from './inquiry.model';

export const createInquiry = async (data: any) => { return await Inquiry.create(data); };
export const getAllInquirys = async () => { return await Inquiry.find(); };
export const getInquiryById = async (id: string) => {
  const doc = await Inquiry.findById(id);
  if (!doc) throw new AppError('Not found', 404);
  return doc;
};
export const updateInquiry = async (id: string, data: any) => {
  const doc = await Inquiry.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!doc) throw new AppError('Not found', 404);
  return doc;
};

export const deleteInquiry = async (id: string) => {
  const doc = await Inquiry.findByIdAndDelete(id);
  if (!doc) throw new AppError('Not found', 404);
  return doc;
};

export const InquiryService = {
  createInquiry,
  getAllInquirys,
  getInquiryById,
  updateInquiry,
  deleteInquiry
};
