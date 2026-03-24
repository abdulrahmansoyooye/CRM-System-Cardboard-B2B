import { Schema, model } from 'mongoose';
export const inquirySchema = new Schema({
  name: { type: String, required: true },
  company: { type: String },
  phone: { type: String },
  email: { type: String, required: true },
  message: { type: String },
  productInterested: { type: String },
  status: { type: String, enum: ['new', 'contacted', 'quoted', 'closed'], default: 'new' },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
  notes: { type: String }
}, { timestamps: true });
inquirySchema.index({ status: 1, assignedTo: 1 });
export const Inquiry = model('Inquiry', inquirySchema);
