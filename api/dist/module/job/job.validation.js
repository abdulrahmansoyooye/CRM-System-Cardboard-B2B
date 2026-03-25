"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobValidation = exports.updateJobSchema = exports.createJobSchema = void 0;
const zod_1 = require("zod");
exports.createJobSchema = zod_1.z.object({
    body: zod_1.z.object({})
});
exports.updateJobSchema = zod_1.z.object({
    body: zod_1.z.object({}).partial()
});
exports.JobValidation = {
    createJobSchema: exports.createJobSchema,
    updateJobSchema: exports.updateJobSchema
};
//# sourceMappingURL=job.validation.js.map