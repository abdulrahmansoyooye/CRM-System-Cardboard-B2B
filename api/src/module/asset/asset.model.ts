import { Schema, model } from 'mongoose';

export const assetSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, default: 'Uncategorized' },
  url: { type: String, required: true },
  size: { type: String },
  dimensions: { type: String },
  type: { type: String }, // e.g., JPEG, PNG, SVG
  mimeType: { type: String },
}, { timestamps: true });
assetSchema.index({ category: 1, type: 1 });
assetSchema.index({ createdAt: -1 });

export const Asset = model('Asset', assetSchema);
