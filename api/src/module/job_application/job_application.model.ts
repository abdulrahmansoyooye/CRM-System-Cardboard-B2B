import { Schema, model } from 'mongoose';
export const jobApplicationSchema = new Schema({
  jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  resumeFile: { type: String },
  status: { type: String, enum: ['new', 'reviewed', 'shortlisted', 'rejected'], default: 'new' },
  notes: { type: String }
}, { timestamps: true });
jobApplicationSchema.index({ jobId: 1, status: 1 });
export const JobApplication = model('JobApplication', jobApplicationSchema);
