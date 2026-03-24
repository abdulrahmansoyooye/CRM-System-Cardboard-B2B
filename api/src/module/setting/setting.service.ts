import { AppError } from '../../core/errors/AppError';
import { Setting } from './setting.model';

export const createSetting = async (data: any) => { return await Setting.create(data); };
export const getAllSettings = async () => { return await Setting.find(); };
export const getSettingById = async (id: string) => {
  const doc = await Setting.findById(id);
  if (!doc) throw new AppError('Not found', 404);
  return doc;
};
export const updateSetting = async (id: string, data: any) => {
  const doc = await Setting.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!doc) throw new AppError('Not found', 404);
  return doc;
};

export const deleteSetting = async (id: string) => {
  const doc = await Setting.findByIdAndDelete(id);
  if (!doc) throw new AppError('Not found', 404);
  return doc;
};

export const SettingService = {
  createSetting,
  getAllSettings,
  getSettingById,
  updateSetting,
  deleteSetting
};
