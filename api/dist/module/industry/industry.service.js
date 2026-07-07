"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndustryService = exports.deleteIndustry = exports.updateIndustry = exports.getIndustryBySlug = exports.getAllIndustrys = exports.createIndustry = void 0;
const AppError_1 = require("../../core/errors/AppError");
const slug_1 = require("../../utils/slug");
const sanitize_1 = require("../../utils/sanitize");
const industry_model_1 = require("./industry.model");
const pagination_1 = require("../../utils/pagination");
const createIndustry = async (data) => {
    const sanitized = (0, sanitize_1.sanitizeContentData)(data);
    if (sanitized.name)
        sanitized.slug = (0, slug_1.generateSlug)(sanitized.name);
    return await industry_model_1.Industry.create(sanitized);
};
exports.createIndustry = createIndustry;
const getAllIndustrys = async (query) => {
    const { page, limit, skip } = (0, pagination_1.getPaginationParams)(query);
    const [result, total] = await Promise.all([
        industry_model_1.Industry.find().populate('relatedProducts').skip(skip).limit(limit),
        industry_model_1.Industry.countDocuments(),
    ]);
    return { result, meta: { page, limit, total, totalPage: Math.ceil(total / limit) } };
};
exports.getAllIndustrys = getAllIndustrys;
const getIndustryBySlug = async (slug) => {
    const doc = await industry_model_1.Industry.findOne({ slug }).populate('relatedProducts');
    if (!doc)
        throw new AppError_1.AppError('Not found', 404);
    return doc;
};
exports.getIndustryBySlug = getIndustryBySlug;
const updateIndustry = async (id, data) => {
    const sanitized = (0, sanitize_1.sanitizeContentData)(data);
    if (sanitized.name)
        sanitized.slug = (0, slug_1.generateSlug)(sanitized.name);
    const doc = await industry_model_1.Industry.findByIdAndUpdate(id, sanitized, { new: true, runValidators: true });
    if (!doc)
        throw new AppError_1.AppError('Not found', 404);
    return doc;
};
exports.updateIndustry = updateIndustry;
const deleteIndustry = async (id) => {
    const doc = await industry_model_1.Industry.findByIdAndDelete(id);
    if (!doc)
        throw new AppError_1.AppError('Not found', 404);
    return doc;
};
exports.deleteIndustry = deleteIndustry;
exports.IndustryService = {
    createIndustry: exports.createIndustry,
    getAllIndustrys: exports.getAllIndustrys,
    getIndustryBySlug: exports.getIndustryBySlug,
    updateIndustry: exports.updateIndustry,
    deleteIndustry: exports.deleteIndustry
};
//# sourceMappingURL=industry.service.js.map