"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndustryController = exports.deleteDoc = exports.update = exports.getBySlug = exports.getAll = exports.create = void 0;
const sendResponse_1 = __importDefault(require("../../core/response/sendResponse"));
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const industry_service_1 = require("./industry.service");
exports.create = (0, asyncHandler_1.default)(async (req, res, next) => {
    const doc = await industry_service_1.IndustryService.createIndustry(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Created successfully',
        data: doc
    });
});
exports.getAll = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { result, meta } = await industry_service_1.IndustryService.getAllIndustrys(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Success',
        meta,
        data: result
    });
});
exports.getBySlug = (0, asyncHandler_1.default)(async (req, res, next) => {
    const doc = await industry_service_1.IndustryService.getIndustryBySlug(req.params.slug);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Success',
        data: doc
    });
});
exports.update = (0, asyncHandler_1.default)(async (req, res, next) => {
    const doc = await industry_service_1.IndustryService.updateIndustry(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Updated successfully',
        data: doc
    });
});
exports.deleteDoc = (0, asyncHandler_1.default)(async (req, res, next) => {
    const doc = await industry_service_1.IndustryService.deleteIndustry(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Deleted successfully',
        data: doc
    });
});
exports.IndustryController = {
    create: exports.create,
    getAll: exports.getAll,
    getBySlug: exports.getBySlug,
    update: exports.update,
    deleteDoc: exports.deleteDoc
};
//# sourceMappingURL=industry.controller.js.map