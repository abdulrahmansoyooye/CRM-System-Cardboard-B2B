"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobApplication = exports.jobApplicationSchema = void 0;
const mongoose_1 = require("mongoose");
exports.jobApplicationSchema = new mongoose_1.Schema({
    jobId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Job', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    resumeFile: { type: String },
    status: { type: String, enum: ['new', 'reviewed', 'shortlisted', 'rejected'], default: 'new' },
    notes: { type: String }
}, { timestamps: true });
exports.jobApplicationSchema.index({ jobId: 1, status: 1 });
exports.JobApplication = (0, mongoose_1.model)('JobApplication', exports.jobApplicationSchema);
//# sourceMappingURL=job_application.model.js.map