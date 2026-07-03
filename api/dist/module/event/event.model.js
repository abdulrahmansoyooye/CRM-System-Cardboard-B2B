"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = exports.eventSchema = void 0;
const mongoose_1 = require("mongoose");
exports.eventSchema = new mongoose_1.Schema({
    title: { type: String, required: true, index: 'text' },
    description: { type: String, index: 'text' },
    eventDate: { type: Date, index: true },
    images: [{ type: String }],
    isFeatured: { type: Boolean, default: false, index: true }
}, { timestamps: true });
exports.Event = (0, mongoose_1.model)('Event', exports.eventSchema);
//# sourceMappingURL=event.model.js.map