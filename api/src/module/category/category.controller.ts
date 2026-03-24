import { Request, Response, NextFunction } from 'express';
import sendResponse from "../../core/response/sendResponse";
import asyncHandler from "../../utils/asyncHandler";
import { CategoryService } from "./category.service";

export const create = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const category = await CategoryService.createCategory(req.body);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Category created successfully",
        data: category
    });
});

export const getAll = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const categories = await CategoryService.getAllCategories();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Categories fetched successfully",
        data: categories
    });
});

export const getBySlug = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const category = await CategoryService.getCategoryBySlug(req.params.slug);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Category fetched successfully",
        data: category
    });
});

export const update = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const category = await CategoryService.updateCategory(req.params.id, req.body);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Category updated successfully",
        data: category
    });
});

export const deleteCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const category = await CategoryService.deleteCategory(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Category deleted successfully",
        data: category
    });
});

export const CategoryController = {
  create,
  getAll,
  getBySlug,
  update,
  deleteCategory
};