"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndustryValidation = exports.updateIndustrySchema = exports.createIndustrySchema = void 0;
const zod_1 = require("zod");
exports.createIndustrySchema = zod_1.z.object({
    body: zod_1.z.object({})
});
exports.updateIndustrySchema = zod_1.z.object({
    body: zod_1.z.object({}).partial()
});
exports.IndustryValidation = {
    createIndustrySchema: exports.createIndustrySchema,
    updateIndustrySchema: exports.updateIndustrySchema
};
//# sourceMappingURL=industry.validation.js.map