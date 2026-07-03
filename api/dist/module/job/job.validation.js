"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobValidation = exports.updateJobSchema = exports.createJobSchema = void 0;
const zod_1 = require("zod");
exports.createJobSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ message: 'Title is required' }),
        department: zod_1.z.string().optional(),
        experience: zod_1.z.string().optional(),
        location: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        status: zod_1.z.enum(['open', 'closed']).default('open'),
    }).strict(),
});
exports.updateJobSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        department: zod_1.z.string().optional(),
        experience: zod_1.z.string().optional(),
        location: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        status: zod_1.z.enum(['open', 'closed']).optional(),
    }).strict(),
});
exports.JobValidation = {
    createJobSchema: exports.createJobSchema,
    updateJobSchema: exports.updateJobSchema,
};
//# sourceMappingURL=job.validation.js.map