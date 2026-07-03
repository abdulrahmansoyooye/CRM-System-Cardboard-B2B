import { AppError } from '../../core/errors/AppError';
import { CreateTestimonialDTO, UpdateTestimonialDTO } from '../../types/dtos';
import { Testimonial } from './testimonial.model';

export const createTestimonial = async (data: CreateTestimonialDTO) => { return await Testimonial.create(data); };
export const getAllTestimonials = async () => { return await Testimonial.find(); };
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
