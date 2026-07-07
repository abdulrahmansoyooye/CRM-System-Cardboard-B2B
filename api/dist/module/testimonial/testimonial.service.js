"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestimonialService = exports.deleteTestimonial = exports.updateTestimonial = exports.getTestimonialById = exports.getAllTestimonials = exports.createTestimonial = void 0;
const AppError_1 = require("../../core/errors/AppError");
const testimonial_model_1 = require("./testimonial.model");
const pagination_1 = require("../../utils/pagination");
const createTestimonial = async (data) => { return await testimonial_model_1.Testimonial.create(data); };
exports.createTestimonial = createTestimonial;
const getAllTestimonials = async (query) => {
    const { page, limit, skip } = (0, pagination_1.getPaginationParams)(query);
    const [result, total] = await Promise.all([
        testimonial_model_1.Testimonial.find().skip(skip).limit(limit),
        testimonial_model_1.Testimonial.countDocuments(),
    ]);
    return { result, meta: { page, limit, total, totalPage: Math.ceil(total / limit) } };
};
exports.getAllTestimonials = getAllTestimonials;
const getTestimonialById = async (id) => {
    const doc = await testimonial_model_1.Testimonial.findById(id);
    if (!doc)
        throw new AppError_1.AppError('Not found', 404);
    return doc;
};
exports.getTestimonialById = getTestimonialById;
const updateTestimonial = async (id, data) => {
    const doc = await testimonial_model_1.Testimonial.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!doc)
        throw new AppError_1.AppError('Not found', 404);
    return doc;
};
exports.updateTestimonial = updateTestimonial;
const deleteTestimonial = async (id) => {
    const doc = await testimonial_model_1.Testimonial.findByIdAndDelete(id);
    if (!doc)
        throw new AppError_1.AppError('Not found', 404);
    return doc;
};
exports.deleteTestimonial = deleteTestimonial;
exports.TestimonialService = {
    createTestimonial: exports.createTestimonial,
    getAllTestimonials: exports.getAllTestimonials,
    getTestimonialById: exports.getTestimonialById,
    updateTestimonial: exports.updateTestimonial,
    deleteTestimonial: exports.deleteTestimonial
};
//# sourceMappingURL=testimonial.service.js.map