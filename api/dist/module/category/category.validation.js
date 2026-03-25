"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryValidation = void 0;
const zod_1 = require("zod");
const createCategorySchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        slug: zod_1.z.string(),
        description: zod_1.z.string().optional(),
        coverImage: zod_1.z.string().optional(),
        seo: zod_1.z.object({
            metaTitle: zod_1.z.string().optional(),
            metaDescription: zod_1.z.string().optional(),
        }).optional(),
        isActive: zod_1.z.boolean().optional(),
    }),
});
const updateCategorySchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        slug: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        coverImage: zod_1.z.string().optional(),
        seo: zod_1.z.object({
            metaTitle: zod_1.z.string().optional(),
            metaDescription: zod_1.z.string().optional(),
        }).optional(),
        isActive: zod_1.z.boolean().optional(),
    }),
});
exports.CategoryValidation = {
    createCategorySchema,
    updateCategorySchema,
};
//# sourceMappingURL=category.validation.js.map