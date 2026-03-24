import { AppError } from '../../core/errors/AppError';
import { Job_application } from './job_application.model';

export const createJob_application = async (data: any) => { return await Job_application.create(data); };
export const getAllJob_applications = async () => { return await Job_application.find(); };
export const getJob_applicationById = async (id: string) => {
  const doc = await Job_application.findById(id);
  if (!doc) throw new AppError('Not found', 404);
  return doc;
};
export const updateJob_application = async (id: string, data: any) => {
  const doc = await Job_application.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!doc) throw new AppError('Not found', 404);
  return doc;
};

export const deleteJob_application = async (id: string) => {
  const doc = await Job_application.findByIdAndDelete(id);
  if (!doc) throw new AppError('Not found', 404);
  return doc;
};

export const Job_applicationService = {
  createJob_application,
  getAllJob_applications,
  getJob_applicationById,
  updateJob_application,
  deleteJob_application
};
