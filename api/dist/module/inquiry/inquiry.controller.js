"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InquiryController = exports.deleteDoc = exports.update = exports.getById = exports.getAll = exports.create = void 0;
const sendResponse_1 = __importDefault(require("../../core/response/sendResponse"));
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const inquiry_service_1 = require("./inquiry.service");
exports.create = (0, asyncHandler_1.default)(async (req, res, next) => {
    const doc = await inquiry_service_1.InquiryService.createInquiry(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Created successfully',
        data: doc
    });
});
exports.getAll = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { result, meta } = await inquiry_service_1.InquiryService.getAllInquirys(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Success',
        meta,
        data: result
    });
});
exports.getById = (0, asyncHandler_1.default)(async (req, res, next) => {
    const doc = await inquiry_service_1.InquiryService.getInquiryById(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Success',
        data: doc
    });
});
exports.update = (0, asyncHandler_1.default)(async (req, res, next) => {
    const doc = await inquiry_service_1.InquiryService.updateInquiry(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Updated successfully',
        data: doc
    });
});
exports.deleteDoc = (0, asyncHandler_1.default)(async (req, res, next) => {
    const doc = await inquiry_service_1.InquiryService.deleteInquiry(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Deleted successfully',
        data: doc
    });
});
exports.InquiryController = {
    create: exports.create,
    getAll: exports.getAll,
    getById: exports.getById,
    update: exports.update,
    deleteDoc: exports.deleteDoc
};
//# sourceMappingURL=inquiry.controller.js.map