"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = exports.deleteBlog = exports.updateBlog = exports.getBlogBySlug = exports.getAllBlogs = exports.createBlog = void 0;
const AppError_1 = require("../../core/errors/AppError");
const slug_1 = require("../../utils/slug");
const sanitize_1 = require("../../utils/sanitize");
const blog_model_1 = require("./blog.model");
const pagination_1 = require("../../utils/pagination");
const createBlog = async (data) => {
    const sanitized = (0, sanitize_1.sanitizeContentData)(data);
    if (sanitized.title)
        sanitized.slug = (0, slug_1.generateSlug)(sanitized.title);
    if (sanitized.status === 'published' && !sanitized.publishedAt)
        sanitized.publishedAt = new Date();
    return await blog_model_1.Blog.create(sanitized);
};
exports.createBlog = createBlog;
const getAllBlogs = async (query) => {
    const { page, limit, skip } = (0, pagination_1.getPaginationParams)(query);
    const [result, total] = await Promise.all([
        blog_model_1.Blog.find().skip(skip).limit(limit),
        blog_model_1.Blog.countDocuments(),
    ]);
    return { result, meta: { page, limit, total, totalPage: Math.ceil(total / limit) } };
};
exports.getAllBlogs = getAllBlogs;
const getBlogBySlug = async (slug) => {
    const doc = await blog_model_1.Blog.findOne({ slug });
    if (!doc)
        throw new AppError_1.AppError('Not found', 404);
    return doc;
};
exports.getBlogBySlug = getBlogBySlug;
const updateBlog = async (id, data) => {
    const sanitized = (0, sanitize_1.sanitizeContentData)(data);
    if (sanitized.title)
        sanitized.slug = (0, slug_1.generateSlug)(sanitized.title);
    if (sanitized.status === 'published' && !sanitized.publishedAt)
        sanitized.publishedAt = new Date();
    const doc = await blog_model_1.Blog.findByIdAndUpdate(id, sanitized, { new: true, runValidators: true });
    if (!doc)
        throw new AppError_1.AppError('Not found', 404);
    return doc;
};
exports.updateBlog = updateBlog;
const deleteBlog = async (id) => {
    const doc = await blog_model_1.Blog.findByIdAndDelete(id);
    if (!doc)
        throw new AppError_1.AppError('Not found', 404);
    return doc;
};
exports.deleteBlog = deleteBlog;
exports.BlogService = {
    createBlog: exports.createBlog,
    getAllBlogs: exports.getAllBlogs,
    getBlogBySlug: exports.getBlogBySlug,
    updateBlog: exports.updateBlog,
    deleteBlog: exports.deleteBlog
};
//# sourceMappingURL=blog.service.js.map