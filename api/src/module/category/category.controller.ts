import { Request, Response, NextFunction } from 'express';
import sendResponse from "../../core/response/sendResponse";
import { responseCache, getCacheKey, purgeByPrefix } from "../../core/response/responseCache";
import asyncHandler from "../../utils/asyncHandler";
import { CategoryService } from "./category.service";

const CACHE_TTL = 300;

export const create = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const category = await CategoryService.createCategory(req.body);
    purgeByPrefix('GET:/api/v1/categories');
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Category created successfully",
        data: category
    });
});

export const getAll = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const cacheKey = getCacheKey(req);
    const cached = responseCache.get(cacheKey);
    if (cached) {
        return sendResponse(res, cached as any);
    }

    const { result, meta } = await CategoryService.getAllCategories(req.query);
    responseCache.set(cacheKey, { statusCode: 200, success: true, message: "Categories fetched successfully", meta, data: result }, CACHE_TTL);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Categories fetched successfully",
        meta,
        data: result
    });
});

export const getBySlug = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const cacheKey = getCacheKey(req);
    const cached = responseCache.get(cacheKey);
    if (cached) {
        return sendResponse(res, cached as any);
    }

    const category = await CategoryService.getCategoryBySlug(req.params.slug as string);
    responseCache.set(cacheKey, { statusCode: 200, success: true, message: "Category fetched successfully", data: category }, CACHE_TTL);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Category fetched successfully",
        data: category
    });
});

export const update = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const category = await CategoryService.updateCategory(req.params.id as string, req.body);
    purgeByPrefix('GET:/api/v1/categories');
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Category updated successfully",
        data: category
    });
});

export const deleteCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const category = await CategoryService.deleteCategory(req.params.id as string);
    purgeByPrefix('GET:/api/v1/categories');
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