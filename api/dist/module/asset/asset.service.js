"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetService = void 0;
const asset_model_1 = require("./asset.model");
const AppError_1 = require("../../core/errors/AppError");
const storage_1 = require("../../utils/storage");
exports.AssetService = {
    createAsset: async (data, file) => {
        (0, storage_1.ensureUploadDir)();
        let url = data.url;
        let size = data.size;
        let mimeType = data.mimeType;
        if (file) {
            url = (0, storage_1.getPublicUrl)(file.filename);
            const fileSizeBytes = (0, storage_1.getFileSize)(file.filename);
            size = fileSizeBytes ?? 0;
            mimeType = file.mimetype;
        }
        return await asset_model_1.Asset.create({
            name: data.name,
            category: data.category || 'Uncategorized',
            url,
            size: size !== undefined ? String(size) : undefined,
            type: mimeType ? mimeType.split('/')[1]?.toUpperCase() : data.type,
            mimeType,
        });
    },
    getAllAssets: async () => {
        return await asset_model_1.Asset.find().sort({ createdAt: -1 });
    },
    deleteAsset: async (id) => {
        const doc = await asset_model_1.Asset.findById(id);
        if (!doc)
            throw new AppError_1.AppError('Asset not found', 404);
        // Clean up local file if it was uploaded
        if (doc.url && !doc.url.startsWith('http')) {
            const filename = doc.url.split('/').pop();
            if (filename) {
                (0, storage_1.deleteFile)(filename);
            }
        }
        await asset_model_1.Asset.findByIdAndDelete(id);
        return doc;
    }
};
//# sourceMappingURL=asset.service.js.map