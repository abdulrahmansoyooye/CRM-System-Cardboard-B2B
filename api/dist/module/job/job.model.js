"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job = exports.jobSchema = void 0;
const mongoose_1 = require("mongoose");
exports.jobSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    department: { type: String },
    experience: { type: String },
    location: { type: String },
    description: { type: String },
    status: { type: String, enum: ['open', 'closed'], default: 'open' }
}, { timestamps: true });
exports.jobSchema.index({ status: 1 });
exports.Job = (0, mongoose_1.model)('Job', exports.jobSchema);
//# sourceMappingURL=job.model.js.map