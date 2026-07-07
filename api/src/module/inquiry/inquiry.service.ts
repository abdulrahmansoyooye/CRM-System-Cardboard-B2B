import { AppError } from '../../core/errors/AppError';
import { CreateInquiryDTO, UpdateInquiryDTO } from '../../types/dtos';
import { Inquiry } from './inquiry.model';
import { getPaginationParams } from '../../utils/pagination';

export const createInquiry = async (data: CreateInquiryDTO) => { return await Inquiry.create(data); };
export const getAllInquirys = async (query: Record<string, unknown>) => {
  const { page, limit, skip } = getPaginationParams(query);
  const [result, total] = await Promise.all([
    Inquiry.find().skip(skip).limit(limit),
    Inquiry.countDocuments(),
  ]);
  return { result, meta: { page, limit, total, totalPage: Math.ceil(total / limit) } };
};
export const getInquiryById = async (id: string) => {
  const doc = await Inquiry.findById(id);
  if (!doc) throw new AppError('Not found', 404);
  return doc;
};
export const updateInquiry = async (id: string, data: UpdateInquiryDTO) => {
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
