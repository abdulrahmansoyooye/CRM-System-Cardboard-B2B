"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuoteValidation = exports.updateQuoteSchema = exports.createQuoteSchema = void 0;
const zod_1 = require("zod");
exports.createQuoteSchema = zod_1.z.object({
    body: zod_1.z.object({
        productId: zod_1.z.string().optional(),
        quantity: zod_1.z.number().optional(),
        customizationDetails: zod_1.z.string().optional(),
        deliveryLocation: zod_1.z.string().optional(),
        name: zod_1.z.string({ message: 'Name is required' }),
        phone: zod_1.z.string().optional(),
        email: zod_1.z.string({ message: 'Email is required' }).email(),
        notes: zod_1.z.string().optional(),
    }).strict(),
});
exports.updateQuoteSchema = zod_1.z.object({
    body: zod_1.z.object({
        productId: zod_1.z.string().optional(),
        quantity: zod_1.z.number().optional(),
        customizationDetails: zod_1.z.string().optional(),
        deliveryLocation: zod_1.z.string().optional(),
        name: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional(),
        email: zod_1.z.string().email().optional(),
        status: zod_1.z.string().optional(),
        notes: zod_1.z.string().optional(),
    }).strict(),
});
exports.QuoteValidation = {
    createQuoteSchema: exports.createQuoteSchema,
    updateQuoteSchema: exports.updateQuoteSchema,
};
//# sourceMappingURL=quote.validation.js.map