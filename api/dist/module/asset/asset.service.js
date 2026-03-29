"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetService = void 0;
const asset_model_1 = require("./asset.model");
const AppError_1 = require("../../core/errors/AppError");
exports.AssetService = {
    createAsset: async (data) => {
        return await asset_model_1.Asset.create(data);
    },
    getAllAssets: async () => {
        return await asset_model_1.Asset.find().sort({ createdAt: -1 });
    },
    deleteAsset: async (id) => {
        const doc = await asset_model_1.Asset.findByIdAndDelete(id);
        if (!doc)
            throw new AppError_1.AppError('Asset not found', 404);
        return doc;
    }
};
//# sourceMappingURL=asset.service.js.map