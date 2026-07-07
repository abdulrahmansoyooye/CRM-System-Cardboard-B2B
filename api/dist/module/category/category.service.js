"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const category_model_1 = require("./category.model");
const AppError_1 = require("../../core/errors/AppError");
const slug_1 = require("../../utils/slug");
const pagination_1 = require("../../utils/pagination");
const createCategory = async (payload) => {
    if (payload.name)
        payload.slug = (0, slug_1.generateSlug)(payload.name);
    const isExists = await category_model_1.Category.findOne({ slug: payload.slug });
    if (isExists)
        throw new AppError_1.AppError('Category with this slug already exists!', 400);
    return await category_model_1.Category.create(payload);
};
const getAllCategories = async (query) => {
    const { page, limit, skip } = (0, pagination_1.getPaginationParams)(query);
    const [result, total] = await Promise.all([
        category_model_1.Category.find().skip(skip).limit(limit),
        category_model_1.Category.countDocuments(),
    ]);
    return { result, meta: { page, limit, total, totalPage: Math.ceil(total / limit) } };
};
const getCategoryBySlug = async (slug) => {
    const category = await category_model_1.Category.findOne({ slug }).populate('products');
    if (!category)
        throw new AppError_1.AppError('Category not found', 404);
    return category;
};
const updateCategory = async (id, payload) => {
    if (payload.name)
        payload.slug = (0, slug_1.generateSlug)(payload.name);
    const category = await category_model_1.Category.findByIdAndUpdate(id, payload, { new: true });
    if (!category)
        throw new AppError_1.AppError('Category not found', 404);
    return category;
};
const deleteCategory = async (id) => {
    const category = await category_model_1.Category.findByIdAndDelete(id);
    if (!category)
        throw new AppError_1.AppError('Category not found', 404);
    return category;
};
exports.CategoryService = {
    createCategory,
    getAllCategories,
    getCategoryBySlug,
    updateCategory,
    deleteCategory
};
//# sourceMappingURL=category.service.js.map