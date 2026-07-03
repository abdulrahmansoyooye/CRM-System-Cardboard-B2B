"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestimonialValidation = exports.updateTestimonialSchema = exports.createTestimonialSchema = void 0;
const zod_1 = require("zod");
exports.createTestimonialSchema = zod_1.z.object({
    body: zod_1.z.object({
        clientName: zod_1.z.string({ message: 'Client name is required' }),
        company: zod_1.z.string().optional(),
        feedback: zod_1.z.string({ message: 'Feedback is required' }),
        rating: zod_1.z.number().min(1).max(5).optional(),
        isPublished: zod_1.z.boolean().default(false),
    }).strict(),
});
exports.updateTestimonialSchema = zod_1.z.object({
    body: zod_1.z.object({
        clientName: zod_1.z.string().optional(),
        company: zod_1.z.string().optional(),
        feedback: zod_1.z.string().optional(),
        rating: zod_1.z.number().min(1).max(5).optional(),
        isPublished: zod_1.z.boolean().optional(),
    }).strict(),
});
exports.TestimonialValidation = {
    createTestimonialSchema: exports.createTestimonialSchema,
    updateTestimonialSchema: exports.updateTestimonialSchema,
};
//# sourceMappingURL=testimonial.validation.js.map