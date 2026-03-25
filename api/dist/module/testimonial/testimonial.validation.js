"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestimonialValidation = exports.updateTestimonialSchema = exports.createTestimonialSchema = void 0;
const zod_1 = require("zod");
exports.createTestimonialSchema = zod_1.z.object({
    body: zod_1.z.object({})
});
exports.updateTestimonialSchema = zod_1.z.object({
    body: zod_1.z.object({}).partial()
});
exports.TestimonialValidation = {
    createTestimonialSchema: exports.createTestimonialSchema,
    updateTestimonialSchema: exports.updateTestimonialSchema
};
//# sourceMappingURL=testimonial.validation.js.map