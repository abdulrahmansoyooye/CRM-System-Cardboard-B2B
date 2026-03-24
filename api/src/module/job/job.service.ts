import { AppError } from '../../core/errors/AppError';
import { Job } from './job.model';

export const createJob = async (data: any) => { return await Job.create(data); };
export const getAllJobs = async () => { return await Job.find(); };
export const getJobById = async (id: string) => {
  const doc = await Job.findById(id);
  if (!doc) throw new AppError('Not found', 404);
  return doc;
};
export const updateJob = async (id: string, data: any) => {
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
