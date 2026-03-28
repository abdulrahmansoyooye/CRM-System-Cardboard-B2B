import { Schema, model } from 'mongoose';

export const assetSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, default: 'Uncategorized' },
  url: { type: String, required: true },
  size: { type: String },
  dimensions: { type: String },
  type: { type: String }, // e.g., JPEG, PNG, SVG
}, { timestamps: true });

export const Asset = model('Asset', assetSchema);
