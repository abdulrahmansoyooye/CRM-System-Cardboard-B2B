"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, trim: true },
    coverImage: { type: String },
    seo: {
        metaTitle: { type: String },
        metaDescription: { type: String },
    },
    isActive: { type: Boolean, default: true, index: true },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            delete ret.__v;
            return ret;
        },
    },
    toObject: {
        virtuals: true
    }
});
// Setup a virtual field to populate the products belonging to this category
categorySchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'categoryId',
});
exports.Category = (0, mongoose_1.model)('Category', categorySchema);
//# sourceMappingURL=category.model.js.map