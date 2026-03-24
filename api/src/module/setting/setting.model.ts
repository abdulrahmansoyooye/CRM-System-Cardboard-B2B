import { Schema, model } from 'mongoose';
export const settingSchema = new Schema({
  logo: { type: String },
  favicon: { type: String },
  contactEmail: { type: String },
  contactPhone: { type: String },
  address: { type: String },
  socialLinks: { type: Object },
  defaultSEO: { type: Object },
  homepageHero: { type: Object },
  ctaBanner: { type: Object },
  analyticsId: { type: String }
}, { timestamps: true });
export const Setting = model('Setting', settingSchema);
