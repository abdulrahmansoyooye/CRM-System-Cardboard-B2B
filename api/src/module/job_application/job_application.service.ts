import { AppError } from '../../core/errors/AppError';
import { JobApplication } from './job_application.model';

export const createJobApplication = async (data: any) => { return await JobApplication.create(data); };
export const getAllJobApplications = async () => { return await JobApplication.find(); };
export const getJobApplicationById = async (id: string) => {
  const doc = await JobApplication.findById(id);
  if (!doc) throw new AppError('Not found', 404);
  return doc;
};
export const updateJobApplication = async (id: string, data: any) => {
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
