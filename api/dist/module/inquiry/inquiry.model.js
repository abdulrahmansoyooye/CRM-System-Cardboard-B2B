"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inquiry = exports.inquirySchema = void 0;
const mongoose_1 = require("mongoose");
exports.inquirySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    company: { type: String },
    phone: { type: String },
    email: { type: String, required: true },
    message: { type: String },
    productInterested: { type: String },
    status: { type: String, enum: ['new', 'contacted', 'quoted', 'closed'], default: 'new' },
    assignedTo: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    notes: { type: String }
}, { timestamps: true });
exports.inquirySchema.index({ status: 1, assignedTo: 1 });
exports.Inquiry = (0, mongoose_1.model)('Inquiry', exports.inquirySchema);
//# sourceMappingURL=inquiry.model.js.map