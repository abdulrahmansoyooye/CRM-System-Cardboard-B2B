import { Asset } from './asset.model';
import { AppError } from '../../core/errors/AppError';
import { CreateAssetDTO } from '../../types/dtos';
import { ensureUploadDir, getPublicUrl, getFileSize, deleteFile } from '../../utils/storage';

export const AssetService = {
  createAsset: async (data: CreateAssetDTO, file?: Express.Multer.File) => {
    ensureUploadDir();

    let url = data.url;
    let size = data.size;
    let mimeType = data.mimeType;

    if (file) {
      url = getPublicUrl(file.filename);
      const fileSizeBytes = getFileSize(file.filename);
      size = fileSizeBytes ?? 0;
      mimeType = file.mimetype;
    }

    return await Asset.create({
      name: data.name,
      category: (data as any).category || 'Uncategorized',
      url,
      size: size !== undefined ? String(size) : undefined,
      type: mimeType ? mimeType.split('/')[1]?.toUpperCase() : data.type,
      mimeType,
    });
  },

  getAllAssets: async () => {
    return await Asset.find().sort({ createdAt: -1 });
  },

  deleteAsset: async (id: string) => {
    const doc = await Asset.findById(id);
    if (!doc) throw new AppError('Asset not found', 404);

    // Clean up local file if it was uploaded
    if (doc.url && !doc.url.startsWith('http')) {
      const filename = doc.url.split('/').pop();
      if (filename) {
        deleteFile(filename);
      }
    }

    await Asset.findByIdAndDelete(id);
    return doc;
  }
};
