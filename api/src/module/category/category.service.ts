import { Category, TCategory } from "./category.model";
import { AppError } from "../../core/errors/AppError";

const createCategory = async (payload: TCategory) => {
    const isExists = await Category.findOne({ slug: payload.slug });
    if (isExists) throw new AppError('Category with this slug already exists!', 400);
    return await Category.create(payload);
};

const getAllCategories = async () => {
    return await Category.find();
};

const getCategoryBySlug = async (slug: string) => {
    const category = await Category.findOne({ slug }).populate('products');
    if (!category) throw new AppError('Category not found', 404);
    return category;
};

const updateCategory = async (id: string, payload: Partial<TCategory>) => {
    const category = await Category.findByIdAndUpdate(id, payload, { new: true });
    if (!category) throw new AppError('Category not found', 404);
    return category;
};

const deleteCategory = async (id: string) => {
    const category = await Category.findByIdAndDelete(id);
    if (!category) throw new AppError('Category not found', 404);
    return category;
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  getCategoryBySlug,
  updateCategory,
  deleteCategory
};