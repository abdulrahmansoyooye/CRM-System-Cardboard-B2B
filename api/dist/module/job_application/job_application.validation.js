"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job_applicationValidation = exports.updateJob_applicationSchema = exports.createJob_applicationSchema = void 0;
const zod_1 = require("zod");
exports.createJob_applicationSchema = zod_1.z.object({
    body: zod_1.z.object({})
});
exports.updateJob_applicationSchema = zod_1.z.object({
    body: zod_1.z.object({}).partial()
});
exports.Job_applicationValidation = {
    createJob_applicationSchema: exports.createJob_applicationSchema,
    updateJob_applicationSchema: exports.updateJob_applicationSchema
};
//# sourceMappingURL=job_application.validation.js.map