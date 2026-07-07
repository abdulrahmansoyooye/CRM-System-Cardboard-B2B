import { AppError } from '../../core/errors/AppError';
import { CreateSettingDTO, UpdateSettingDTO } from '../../types/dtos';
import { Setting } from './setting.model';
import { getPaginationParams } from '../../utils/pagination';

export const createSetting = async (data: CreateSettingDTO) => { return await Setting.create(data); };
export const getAllSettings = async (query: Record<string, unknown>) => {
  const { page, limit, skip } = getPaginationParams(query);
  const [result, total] = await Promise.all([
    Setting.find().skip(skip).limit(limit),
    Setting.countDocuments(),
  ]);
  return { result, meta: { page, limit, total, totalPage: Math.ceil(total / limit) } };
};
export const getSettingById = async (id: string) => {
  const doc = await Setting.findById(id);
  if (!doc) throw new AppError('Not found', 404);
  return doc;
};
export const updateSetting = async (id: string, data: UpdateSettingDTO) => {
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
