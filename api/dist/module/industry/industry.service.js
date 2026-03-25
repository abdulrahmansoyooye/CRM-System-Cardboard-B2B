"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndustryService = exports.deleteIndustry = exports.updateIndustry = exports.getIndustryBySlug = exports.getAllIndustrys = exports.createIndustry = void 0;
const AppError_1 = require("../../core/errors/AppError");
const industry_model_1 = require("./industry.model");
const createIndustry = async (data) => { return await industry_model_1.Industry.create(data); };
exports.createIndustry = createIndustry;
const getAllIndustrys = async () => { return await industry_model_1.Industry.find(); };
exports.getAllIndustrys = getAllIndustrys;
const getIndustryBySlug = async (slug) => {
    const doc = await industry_model_1.Industry.findOne({ slug });
    if (!doc)
        throw new AppError_1.AppError('Not found', 404);
    return doc;
};
exports.getIndustryBySlug = getIndustryBySlug;
const updateIndustry = async (id, data) => {
    const doc = await industry_model_1.Industry.findByIdAndUpdate(id, data, { new: true, runValidators: true });
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