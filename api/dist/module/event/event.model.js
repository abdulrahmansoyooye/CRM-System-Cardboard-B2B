"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = exports.eventSchema = void 0;
const mongoose_1 = require("mongoose");
exports.eventSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String },
    eventDate: { type: Date },
    images: [{ type: String }],
    isFeatured: { type: Boolean, default: false }
}, { timestamps: true });
exports.Event = (0, mongoose_1.model)('Event', exports.eventSchema);
//# sourceMappingURL=event.model.js.map