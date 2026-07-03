"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidation = exports.updateBlogSchema = exports.createBlogSchema = void 0;
const zod_1 = require("zod");
exports.createBlogSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ message: 'Title is required' }),
        category: zod_1.z.string().optional(),
        excerpt: zod_1.z.string().optional(),
        content: zod_1.z.string().optional(),
        featuredImage: zod_1.z.string().optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
        seo: zod_1.z.object({
            metaTitle: zod_1.z.string().optional(),
            metaDescription: zod_1.z.string().optional(),
        }).strict().optional(),
        status: zod_1.z.enum(['draft', 'published']).default('draft'),
    }).strict(),
});
exports.updateBlogSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
        excerpt: zod_1.z.string().optional(),
        content: zod_1.z.string().optional(),
        featuredImage: zod_1.z.string().optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
        seo: zod_1.z.object({
            metaTitle: zod_1.z.string().optional(),
            metaDescription: zod_1.z.string().optional(),
        }).strict().optional(),
        status: zod_1.z.enum(['draft', 'published']).optional(),
    }).strict(),
});
exports.BlogValidation = {
    createBlogSchema: exports.createBlogSchema,
    updateBlogSchema: exports.updateBlogSchema,
};
//# sourceMappingURL=blog.validation.js.map