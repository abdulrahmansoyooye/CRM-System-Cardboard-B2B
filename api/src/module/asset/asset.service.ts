import { Asset } from './asset.model';
import { AppError } from '../../core/errors/AppError';
import { CreateAssetDTO } from '../../types/dtos';

export const AssetService = {
  createAsset: async (data: CreateAssetDTO) => {
    return await Asset.create({
      ...data,
      size: data.size !== undefined ? String(data.size) : undefined,
    });
  },

  getAllAssets: async () => {
    return await Asset.find().sort({ createdAt: -1 });
  },

  deleteAsset: async (id: string) => {
    const doc = await Asset.findByIdAndDelete(id);
    if (!doc) throw new AppError('Asset not found', 404);
    return doc;
  }
};
