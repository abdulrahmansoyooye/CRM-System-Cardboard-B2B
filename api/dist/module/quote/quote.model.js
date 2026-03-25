"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quote = exports.quoteSchema = void 0;
const mongoose_1 = require("mongoose");
exports.quoteSchema = new mongoose_1.Schema({
    productId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number },
    customizationDetails: { type: String },
    deliveryLocation: { type: String },
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String, required: true },
    status: { type: String, default: 'new' },
    notes: { type: String }
}, { timestamps: true });
exports.quoteSchema.index({ status: 1 });
exports.Quote = (0, mongoose_1.model)('Quote', exports.quoteSchema);
//# sourceMappingURL=quote.model.js.map