"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InquiryValidation = exports.updateInquirySchema = exports.createInquirySchema = void 0;
const zod_1 = require("zod");
exports.createInquirySchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ message: 'Name is required' }),
        company: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
        email: zod_1.z.string({ message: 'Email is required' }).email(),
        message: zod_1.z.string().optional(),
        productInterested: zod_1.z.string().optional(),
    }).strict(),
});
exports.updateInquirySchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        company: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
        email: zod_1.z.string().email().optional(),
        message: zod_1.z.string().optional(),
        status: zod_1.z.enum(['new', 'contacted', 'quoted', 'closed']).optional(),
        notes: zod_1.z.string().optional(),
        assignedTo: zod_1.z.string().optional(),
    }).strict(),
});
exports.InquiryValidation = {
    createInquirySchema: exports.createInquirySchema,
    updateInquirySchema: exports.updateInquirySchema,
};
//# sourceMappingURL=inquiry.validation.js.map