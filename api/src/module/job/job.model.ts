import { Schema, model } from 'mongoose';
export const jobSchema = new Schema({
  title: { type: String, required: true },
  department: { type: String },
  experience: { type: String },
  location: { type: String },
  description: { type: String },
  status: { type: String, enum: ['open', 'closed'], default: 'open' }
}, { timestamps: true });
jobSchema.index({ status: 1 });
export const Job = model('Job', jobSchema);
