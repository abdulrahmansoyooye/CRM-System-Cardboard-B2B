"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = exports.deleteBlog = exports.updateBlog = exports.getBlogBySlug = exports.getAllBlogs = exports.createBlog = void 0;
const AppError_1 = require("../../core/errors/AppError");
const blog_model_1 = require("./blog.model");
const createBlog = async (data) => { return await blog_model_1.Blog.create(data); };
exports.createBlog = createBlog;
const getAllBlogs = async () => { return await blog_model_1.Blog.find(); };
exports.getAllBlogs = getAllBlogs;
const getBlogBySlug = async (slug) => {
    const doc = await blog_model_1.Blog.findOne({ slug });
    if (!doc)
        throw new AppError_1.AppError('Not found', 404);
    return doc;
};
exports.getBlogBySlug = getBlogBySlug;
const updateBlog = async (id, data) => {
    const doc = await blog_model_1.Blog.findByIdAndUpdate(id, data, { new: true, runValidators: true });
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