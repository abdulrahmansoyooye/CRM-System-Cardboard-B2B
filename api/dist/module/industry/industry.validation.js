"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndustryValidation = exports.updateIndustrySchema = exports.createIndustrySchema = void 0;
const zod_1 = require("zod");
exports.createIndustrySchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ message: 'Name is required' }),
        overview: zod_1.z.string().optional(),
        relatedProducts: zod_1.z.array(zod_1.z.string()).optional(),
        images: zod_1.z.array(zod_1.z.string()).optional(),
        seo: zod_1.z.object({
            metaTitle: zod_1.z.string().optional(),
            metaDescription: zod_1.z.string().optional(),
        }).strict().optional(),
        isActive: zod_1.z.boolean().default(true),
    }).strict(),
});
exports.updateIndustrySchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        overview: zod_1.z.string().optional(),
        relatedProducts: zod_1.z.array(zod_1.z.string()).optional(),
        images: zod_1.z.array(zod_1.z.string()).optional(),
        seo: zod_1.z.object({
            metaTitle: zod_1.z.string().optional(),
            metaDescription: zod_1.z.string().optional(),
        }).strict().optional(),
        isActive: zod_1.z.boolean().optional(),
    }).strict(),
});
exports.IndustryValidation = {
    createIndustrySchema: exports.createIndustrySchema,
    updateIndustrySchema: exports.updateIndustrySchema,
};
//# sourceMappingURL=industry.validation.js.map