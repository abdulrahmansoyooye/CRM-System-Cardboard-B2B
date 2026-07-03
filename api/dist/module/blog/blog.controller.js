"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogController = exports.deleteDoc = exports.update = exports.getBySlug = exports.getAll = exports.create = void 0;
const sendResponse_1 = __importDefault(require("../../core/response/sendResponse"));
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const blog_service_1 = require("./blog.service");
exports.create = (0, asyncHandler_1.default)(async (req, res, next) => {
    const doc = await blog_service_1.BlogService.createBlog(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Created successfully',
        data: doc
    });
});
exports.getAll = (0, asyncHandler_1.default)(async (req, res, next) => {
    const docs = await blog_service_1.BlogService.getAllBlogs();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Success',
        data: docs
    });
});
exports.getBySlug = (0, asyncHandler_1.default)(async (req, res, next) => {
    const doc = await blog_service_1.BlogService.getBlogBySlug(req.params.slug);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Success',
        data: doc
    });
});
exports.update = (0, asyncHandler_1.default)(async (req, res, next) => {
    const doc = await blog_service_1.BlogService.updateBlog(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Updated successfully',
        data: doc
    });
});
exports.deleteDoc = (0, asyncHandler_1.default)(async (req, res, next) => {
    const doc = await blog_service_1.BlogService.deleteBlog(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Deleted successfully',
        data: doc
    });
});
exports.BlogController = {
    create: exports.create,
    getAll: exports.getAll,
    getBySlug: exports.getBySlug,
    update: exports.update,
    deleteDoc: exports.deleteDoc
};
//# sourceMappingURL=blog.controller.js.map