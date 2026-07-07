import { AppError } from '../../core/errors/AppError';
import { CreateTestimonialDTO, UpdateTestimonialDTO } from '../../types/dtos';
import { Testimonial } from './testimonial.model';
import { getPaginationParams } from '../../utils/pagination';

export const createTestimonial = async (data: CreateTestimonialDTO) => { return await Testimonial.create(data); };
export const getAllTestimonials = async (query: Record<string, unknown>) => {
  const { page, limit, skip } = getPaginationParams(query);
  const [result, total] = await Promise.all([
    Testimonial.find().skip(skip).limit(limit),
    Testimonial.countDocuments(),
  ]);
  return { result, meta: { page, limit, total, totalPage: Math.ceil(total / limit) } };
};
export const getTestimonialById = async (id: string) => {
  const doc = await Testimonial.findById(id);
  if (!doc) throw new AppError('Not found', 404);
  return doc;
};
export const updateTestimonial = async (id: string, data: UpdateTestimonialDTO) => {
  const doc = await Testimonial.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!doc) throw new AppError('Not found', 404);
  return doc;
};

export const deleteTestimonial = async (id: string) => {
  const doc = await Testimonial.findByIdAndDelete(id);
  if (!doc) throw new AppError('Not found', 404);
  return doc;
};

export const TestimonialService = {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial
};
