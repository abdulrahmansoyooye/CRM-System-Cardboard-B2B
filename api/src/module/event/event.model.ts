import { Schema, model } from 'mongoose';
export const eventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  eventDate: { type: Date },
  images: [{ type: String }],
  isFeatured: { type: Boolean, default: false }
}, { timestamps: true });
export const Event = model('Event', eventSchema);
