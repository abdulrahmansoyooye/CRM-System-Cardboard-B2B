"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InquiryValidation = exports.updateInquirySchema = exports.createInquirySchema = void 0;
const zod_1 = require("zod");
exports.createInquirySchema = zod_1.z.object({
    body: zod_1.z.object({})
});
exports.updateInquirySchema = zod_1.z.object({
    body: zod_1.z.object({}).partial()
});
exports.InquiryValidation = {
    createInquirySchema: exports.createInquirySchema,
    updateInquirySchema: exports.updateInquirySchema
};
//# sourceMappingURL=inquiry.validation.js.map