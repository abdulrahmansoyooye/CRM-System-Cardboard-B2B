"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Testimonial = exports.testimonialSchema = void 0;
const mongoose_1 = require("mongoose");
exports.testimonialSchema = new mongoose_1.Schema({
    clientName: { type: String, required: true },
    company: { type: String },
    feedback: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    isPublished: { type: Boolean, default: false }
}, { timestamps: true });
exports.testimonialSchema.index({ isPublished: 1 });
exports.Testimonial = (0, mongoose_1.model)('Testimonial', exports.testimonialSchema);
//# sourceMappingURL=testimonial.model.js.map