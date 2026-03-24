import { Schema, model, Types } from 'mongoose';

export type TProduct = {
  name: string;
  slug: string;
  categoryId: Types.ObjectId;
  shortDescription?: string;
  fullDescription?: string;
  specifications?: string[];
  materialDetails?: string;
  moq: number;
  deliveryTimeline: string;
  isFeatured: boolean;
  images: string[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  isActive: boolean;
};

const productSchema = new Schema<TProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, index: true },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
      index: true,
    },
    shortDescription: { type: String, trim: true },
    fullDescription: { type: String },
    specifications: [{ type: String }],
    materialDetails: { type: String },
    moq: { type: Number, default: 1 },
    deliveryTimeline: { type: String },
    isFeatured: { type: Boolean, default: false, index: true },
    images: [{ type: String }],
    seo: {
      metaTitle: { type: String },
      metaDescription: { type: String },
    },
    isActive: { type: Boolean, default: true, index: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Add search index
productSchema.index({ name: 'text', shortDescription: 'text' });

export const Product = model<TProduct>('Product', productSchema);
