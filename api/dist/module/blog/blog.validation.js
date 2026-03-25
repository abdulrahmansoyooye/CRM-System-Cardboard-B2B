"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidation = exports.updateBlogSchema = exports.createBlogSchema = void 0;
const zod_1 = require("zod");
exports.createBlogSchema = zod_1.z.object({
    body: zod_1.z.object({})
});
exports.updateBlogSchema = zod_1.z.object({
    body: zod_1.z.object({}).partial()
});
exports.BlogValidation = {
    createBlogSchema: exports.createBlogSchema,
    updateBlogSchema: exports.updateBlogSchema
};
//# sourceMappingURL=blog.validation.js.map