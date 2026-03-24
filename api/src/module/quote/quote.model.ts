import { Schema, model } from 'mongoose';
export const quoteSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  quantity: { type: Number },
  customizationDetails: { type: String },
  deliveryLocation: { type: String },
  name: { type: String, required: true },
  phone: { type: String },
  email: { type: String, required: true },
  status: { type: String, default: 'new' },
  notes: { type: String }
}, { timestamps: true });
quoteSchema.index({ status: 1 });
export const Quote = model('Quote', quoteSchema);
