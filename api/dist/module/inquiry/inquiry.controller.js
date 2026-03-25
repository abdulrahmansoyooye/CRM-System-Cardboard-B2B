"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InquiryController = exports.deleteDoc = exports.update = exports.getById = exports.getAll = exports.create = void 0;
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const inquiry_service_1 = require("./inquiry.service");
exports.create = (0, asyncHandler_1.default)(async (req, res, next) => {
    const doc = await inquiry_service_1.InquiryService.createInquiry(req.body);
    res.status(201).json({ success: true, message: 'Created successfully', data: doc });
});
exports.getAll = (0, asyncHandler_1.default)(async (req, res, next) => {
    const docs = await inquiry_service_1.InquiryService.getAllInquirys();
    res.status(200).json({ success: true, data: docs });
});
exports.getById = (0, asyncHandler_1.default)(async (req, res, next) => {
    const doc = await inquiry_service_1.InquiryService.getInquiryById(req.params.id);
    res.status(200).json({ success: true, data: doc });
});
exports.update = (0, asyncHandler_1.default)(async (req, res, next) => {
    const doc = await inquiry_service_1.InquiryService.updateInquiry(req.params.id, req.body);
    res.status(200).json({ success: true, message: 'Updated successfully', data: doc });
});
exports.deleteDoc = (0, asyncHandler_1.default)(async (req, res, next) => {
    const doc = await inquiry_service_1.InquiryService.deleteInquiry(req.params.id);
    res.status(200).json({ success: true, message: 'Deleted successfully', data: doc });
});
exports.InquiryController = {
    create: exports.create,
    getAll: exports.getAll,
    getById: exports.getById,
    update: exports.update,
    deleteDoc: exports.deleteDoc
};
//# sourceMappingURL=inquiry.controller.js.map