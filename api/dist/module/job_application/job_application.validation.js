"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job_applicationValidation = exports.updateJob_applicationSchema = exports.createJob_applicationSchema = void 0;
const zod_1 = require("zod");
exports.createJob_applicationSchema = zod_1.z.object({
    body: zod_1.z.object({
        jobId: zod_1.z.string({ message: 'Job ID is required' }),
        name: zod_1.z.string({ message: 'Name is required' }),
        email: zod_1.z.string({ message: 'Email is required' }).email(),
        phone: zod_1.z.string().optional(),
        resumeFile: zod_1.z.string().optional(),
        notes: zod_1.z.string().optional(),
        status: zod_1.z.enum(['new', 'reviewed', 'shortlisted', 'rejected']).default('new'),
    }).strict(),
});
exports.updateJob_applicationSchema = zod_1.z.object({
    body: zod_1.z.object({
        jobId: zod_1.z.string().optional(),
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().email().optional(),
        phone: zod_1.z.string().optional(),
        resumeFile: zod_1.z.string().optional(),
        status: zod_1.z.enum(['new', 'reviewed', 'shortlisted', 'rejected']).optional(),
        notes: zod_1.z.string().optional(),
    }).strict(),
});
exports.Job_applicationValidation = {
    createJob_applicationSchema: exports.createJob_applicationSchema,
    updateJob_applicationSchema: exports.updateJob_applicationSchema,
};
//# sourceMappingURL=job_application.validation.js.map