import { AppError } from '../../core/errors/AppError';
import { CreateJobDTO, UpdateJobDTO } from '../../types/dtos';
import { Job } from './job.model';
import { getPaginationParams } from '../../utils/pagination';

export const createJob = async (data: CreateJobDTO) => { return await Job.create(data); };
export const getAllJobs = async (query: Record<string, unknown>) => {
  const { page, limit, skip } = getPaginationParams(query);
  const [result, total] = await Promise.all([
    Job.find().skip(skip).limit(limit),
    Job.countDocuments(),
  ]);
  return { result, meta: { page, limit, total, totalPage: Math.ceil(total / limit) } };
};
export const getJobById = async (id: string) => {
  const doc = await Job.findById(id);
  if (!doc) throw new AppError('Not found', 404);
  return doc;
};
export const updateJob = async (id: string, data: UpdateJobDTO) => {
  const doc = await Job.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!doc) throw new AppError('Not found', 404);
  return doc;
};

export const deleteJob = async (id: string) => {
  const doc = await Job.findByIdAndDelete(id);
  if (!doc) throw new AppError('Not found', 404);
  return doc;
};

export const JobService = {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob
};
