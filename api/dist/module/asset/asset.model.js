"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Asset = exports.assetSchema = void 0;
const mongoose_1 = require("mongoose");
exports.assetSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    category: { type: String, default: 'Uncategorized' },
    url: { type: String, required: true },
    size: { type: String },
    dimensions: { type: String },
    type: { type: String }, // e.g., JPEG, PNG, SVG
    mimeType: { type: String },
}, { timestamps: true });
exports.assetSchema.index({ category: 1, type: 1 });
exports.assetSchema.index({ createdAt: -1 });
exports.Asset = (0, mongoose_1.model)('Asset', exports.assetSchema);
//# sourceMappingURL=asset.model.js.map