"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Industry = exports.industrySchema = void 0;
const mongoose_1 = require("mongoose");
exports.industrySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    overview: { type: String },
    relatedProducts: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Product' }],
    images: [{ type: String }],
    seo: { type: Object },
    isActive: { type: Boolean, default: true }
}, { timestamps: true });
exports.Industry = (0, mongoose_1.model)('Industry', exports.industrySchema);
//# sourceMappingURL=industry.model.js.map