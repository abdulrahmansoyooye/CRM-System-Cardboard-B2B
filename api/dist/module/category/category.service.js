"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const category_model_1 = require("./category.model");
const AppError_1 = require("../../core/errors/AppError");
const createCategory = async (payload) => {
    const isExists = await category_model_1.Category.findOne({ slug: payload.slug });
    if (isExists)
        throw new AppError_1.AppError('Category with this slug already exists!', 400);
    return await category_model_1.Category.create(payload);
};
const getAllCategories = async () => {
    return await category_model_1.Category.find();
};
const getCategoryBySlug = async (slug) => {
    const category = await category_model_1.Category.findOne({ slug }).populate('products');
    if (!category)
        throw new AppError_1.AppError('Category not found', 404);
    return category;
};
const updateCategory = async (id, payload) => {
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