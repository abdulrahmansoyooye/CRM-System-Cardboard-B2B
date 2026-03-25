"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuoteValidation = exports.updateQuoteSchema = exports.createQuoteSchema = void 0;
const zod_1 = require("zod");
exports.createQuoteSchema = zod_1.z.object({
    body: zod_1.z.object({})
});
exports.updateQuoteSchema = zod_1.z.object({
    body: zod_1.z.object({}).partial()
});
exports.QuoteValidation = {
    createQuoteSchema: exports.createQuoteSchema,
    updateQuoteSchema: exports.updateQuoteSchema
};
//# sourceMappingURL=quote.validation.js.map