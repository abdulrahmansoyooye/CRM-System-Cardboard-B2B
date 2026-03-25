"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidation = void 0;
const zod_1 = require("zod");
const createProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ message: 'Product name is required' }).min(3),
        categoryId: zod_1.z.string({ message: 'Category ID is required' }),
        shortDescription: zod_1.z.string().optional(),
        fullDescription: zod_1.z.string().optional(),
        specifications: zod_1.z.array(zod_1.z.string()).optional(),
        materialDetails: zod_1.z.string().optional(),
        moq: zod_1.z.number().min(1).default(1),
        deliveryTimeline: zod_1.z.string().optional(),
        isFeatured: zod_1.z.boolean().default(false),
        images: zod_1.z.array(zod_1.z.string()).min(1, 'At least one image is required'),
        seo: zod_1.z
            .object({
            metaTitle: zod_1.z.string().optional(),
            metaDescription: zod_1.z.string().optional(),
        })
            .optional(),
        isActive: zod_1.z.boolean().default(true),
    }),
});
const updateProductSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(3).optional(),
        categoryId: zod_1.z.string().optional(),
        shortDescription: zod_1.z.string().optional(),
        fullDescription: zod_1.z.string().optional(),
        specifications: zod_1.z.array(zod_1.z.string()).optional(),
        materialDetails: zod_1.z.string().optional(),
        moq: zod_1.z.number().min(1).optional(),
        deliveryTimeline: zod_1.z.string().optional(),
        isFeatured: zod_1.z.boolean().optional(),
        images: zod_1.z.array(zod_1.z.string()).min(1).optional(),
        seo: zod_1.z
            .object({
            metaTitle: zod_1.z.string().optional(),
            metaDescription: zod_1.z.string().optional(),
        })
            .optional(),
        isActive: zod_1.z.boolean().optional(),
    }),
});
exports.ProductValidation = {
    createProductSchema,
    updateProductSchema,
};
//# sourceMappingURL=product.validation.js.map