import { Schema, model } from 'mongoose';
export const eventSchema = new Schema({
  title: { type: String, required: true, index: 'text' },
  description: { type: String, index: 'text' },
  eventDate: { type: Date, index: true },
  images: [{ type: String }],
  isFeatured: { type: Boolean, default: false, index: true }
}, { timestamps: true });
export const Event = model('Event', eventSchema);
