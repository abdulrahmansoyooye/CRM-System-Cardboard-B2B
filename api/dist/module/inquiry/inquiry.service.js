"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InquiryService = exports.deleteInquiry = exports.updateInquiry = exports.getInquiryById = exports.getAllInquirys = exports.createInquiry = void 0;
const AppError_1 = require("../../core/errors/AppError");
const inquiry_model_1 = require("./inquiry.model");
const pagination_1 = require("../../utils/pagination");
const createInquiry = async (data) => { return await inquiry_model_1.Inquiry.create(data); };
exports.createInquiry = createInquiry;
const getAllInquirys = async (query) => {
    const { page, limit, skip } = (0, pagination_1.getPaginationParams)(query);
    const [result, total] = await Promise.all([
        inquiry_model_1.Inquiry.find().skip(skip).limit(limit),
        inquiry_model_1.Inquiry.countDocuments(),
    ]);
    return { result, meta: { page, limit, total, totalPage: Math.ceil(total / limit) } };
};
exports.getAllInquirys = getAllInquirys;
const getInquiryById = async (id) => {
    const doc = await inquiry_model_1.Inquiry.findById(id);
    if (!doc)
        throw new AppError_1.AppError('Not found', 404);
    return doc;
};
exports.getInquiryById = getInquiryById;
const updateInquiry = async (id, data) => {
    const doc = await inquiry_model_1.Inquiry.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!doc)
        throw new AppError_1.AppError('Not found', 404);
    return doc;
};
exports.updateInquiry = updateInquiry;
const deleteInquiry = async (id) => {
    const doc = await inquiry_model_1.Inquiry.findByIdAndDelete(id);
    if (!doc)
        throw new AppError_1.AppError('Not found', 404);
    return doc;
};
exports.deleteInquiry = deleteInquiry;
exports.InquiryService = {
    createInquiry: exports.createInquiry,
    getAllInquirys: exports.getAllInquirys,
    getInquiryById: exports.getInquiryById,
    updateInquiry: exports.updateInquiry,
    deleteInquiry: exports.deleteInquiry
};
//# sourceMappingURL=inquiry.service.js.map