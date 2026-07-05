import { Schema, model } from 'mongoose';
export const testimonialSchema = new Schema({
  clientName: { type: String, required: true },
  company: { type: String },
  feedback: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },
  isPublished: { type: Boolean, default: false }
}, { timestamps: true });
testimonialSchema.index({ isPublished: 1 });
export const Testimonial = model('Testimonial', testimonialSchema);
