"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = exports.blogSchema = void 0;
const mongoose_1 = require("mongoose");
exports.blogSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    slug: { type: String, unique: true, required: true },
    category: { type: String },
    excerpt: { type: String },
    content: { type: String },
    featuredImage: { type: String },
    tags: [{ type: String }],
    seo: { type: Object },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    publishedAt: { type: Date }
}, { timestamps: true });
exports.blogSchema.index({ status: 1, publishedAt: 1 });
exports.blogSchema.index({ createdAt: -1 });
exports.Blog = (0, mongoose_1.model)('Blog', exports.blogSchema);
//# sourceMappingURL=blog.model.js.map