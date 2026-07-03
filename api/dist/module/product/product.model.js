"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
        index: true,
    },
    shortDescription: { type: String, trim: true },
    fullDescription: { type: String },
    specifications: [{ type: String }],
    materialDetails: { type: String },
    strengthDetails: { type: String },
    availableSizes: [{ type: String }],
    moq: { type: Number, default: 1 },
    deliveryTimeline: { type: String },
    isFeatured: { type: Boolean, default: false, index: true },
    images: [{ type: String }],
    seo: {
        metaTitle: { type: String },
        metaDescription: { type: String },
    },
    isActive: { type: Boolean, default: true, index: true },
}, {
    timestamps: true,
    versionKey: false,
});
// Add search index
productSchema.index({ name: 'text', shortDescription: 'text' });
exports.Product = (0, mongoose_1.model)('Product', productSchema);
//# sourceMappingURL=product.model.js.map