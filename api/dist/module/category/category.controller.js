"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = exports.deleteCategory = exports.update = exports.getBySlug = exports.getAll = exports.create = void 0;
const sendResponse_1 = __importDefault(require("../../core/response/sendResponse"));
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const category_service_1 = require("./category.service");
exports.create = (0, asyncHandler_1.default)(async (req, res, next) => {
    const category = await category_service_1.CategoryService.createCategory(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: "Category created successfully",
        data: category
    });
});
exports.getAll = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { result, meta } = await category_service_1.CategoryService.getAllCategories(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Categories fetched successfully",
        meta,
        data: result
    });
});
exports.getBySlug = (0, asyncHandler_1.default)(async (req, res, next) => {
    const category = await category_service_1.CategoryService.getCategoryBySlug(req.params.slug);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Category fetched successfully",
        data: category
    });
});
exports.update = (0, asyncHandler_1.default)(async (req, res, next) => {
    const category = await category_service_1.CategoryService.updateCategory(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Category updated successfully",
        data: category
    });
});
exports.deleteCategory = (0, asyncHandler_1.default)(async (req, res, next) => {
    const category = await category_service_1.CategoryService.deleteCategory(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: "Category deleted successfully",
        data: category
    });
});
exports.CategoryController = {
    create: exports.create,
    getAll: exports.getAll,
    getBySlug: exports.getBySlug,
    update: exports.update,
    deleteCategory: exports.deleteCategory
};
//# sourceMappingURL=category.controller.js.map