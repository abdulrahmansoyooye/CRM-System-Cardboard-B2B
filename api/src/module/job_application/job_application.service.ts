import { AppError } from '../../core/errors/AppError';
import { CreateJobApplicationDTO, UpdateJobApplicationDTO } from '../../types/dtos';
import { JobApplication } from './job_application.model';
import { getPaginationParams } from '../../utils/pagination';

export const createJobApplication = async (data: CreateJobApplicationDTO) => { return await JobApplication.create(data); };
export const getAllJobApplications = async (query: Record<string, unknown>) => {
  const { page, limit, skip } = getPaginationParams(query);
  const [result, total] = await Promise.all([
    JobApplication.find().skip(skip).limit(limit),
    JobApplication.countDocuments(),
  ]);
  return { result, meta: { page, limit, total, totalPage: Math.ceil(total / limit) } };
};
export const getJobApplicationById = async (id: string) => {
  const doc = await JobApplication.findById(id);
  if (!doc) throw new AppError('Not found', 404);
  return doc;
};
export const updateJobApplication = async (id: string, data: UpdateJobApplicationDTO) => {
  const doc = await JobApplication.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!doc) throw new AppError('Not found', 404);
  return doc;
};

export const deleteJobApplication = async (id: string) => {
  const doc = await JobApplication.findByIdAndDelete(id);
  if (!doc) throw new AppError('Not found', 404);
  return doc;
};

export const JobApplicationService = {
  createJobApplication,
  getAllJobApplications,
  getJobApplicationById,
  updateJobApplication,
  deleteJobApplication
};
