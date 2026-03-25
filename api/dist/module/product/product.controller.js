"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const sendResponse_1 = __importDefault(require("../../core/response/sendResponse"));
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const product_service_1 = require("./product.service");
const create = (0, asyncHandler_1.default)(async (req, res) => {
    const result = await product_service_1.ProductService.createProduct(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Product created successfully',
        data: result,
    });
});
const getAll = (0, asyncHandler_1.default)(async (req, res) => {
    const { result, meta } = await product_service_1.ProductService.getAllProducts(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Products fetched successfully',
        meta,
        data: result,
    });
});
const getBySlug = (0, asyncHandler_1.default)(async (req, res) => {
    const result = await product_service_1.ProductService.getProductBySlug(req.params.slug);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Product fetched successfully',
        data: result,
    });
});
const update = (0, asyncHandler_1.default)(async (req, res) => {
    const result = await product_service_1.ProductService.updateProduct(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Product updated successfully',
        data: result,
    });
});
const deleteProduct = (0, asyncHandler_1.default)(async (req, res) => {
    await product_service_1.ProductService.deleteProduct(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Product deleted successfully',
        data: null,
    });
});
exports.ProductController = {
    create,
    getAll,
    getBySlug,
    update,
    deleteProduct,
};
//# sourceMappingURL=product.controller.js.map