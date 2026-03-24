import { Schema, model } from 'mongoose';
export const blogSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true, required: true },
  category: { type: String },
  excerpt: { type: String },
  content: { type: String },
  featuredImage: { type: String },
  tags: [{ type: String }],
  seo: { type: Object },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  publishedAt: { type: Date }
}, { timestamps: true });
blogSchema.index({ status: 1, publishedAt: 1 });
export const Blog = model('Blog', blogSchema);
