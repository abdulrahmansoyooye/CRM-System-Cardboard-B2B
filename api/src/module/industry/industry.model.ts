import { Schema, model } from 'mongoose';
export const industrySchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  overview: { type: String },
  relatedProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  images: [{ type: String }],
  seo: { type: Object },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });
export const Industry = model('Industry', industrySchema);
