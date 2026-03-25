import { Schema, model } from 'mongoose';

export type TCategory = {
  name: string;
  slug: string;
  description?: string;
  coverImage?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
  };
  isActive: boolean;
};

const categorySchema = new Schema<TCategory>(
  {
    name: { type: String, required: true, trim: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    description: { type: String, trim: true },
    coverImage: { type: String },
    seo: {
      metaTitle: { type: String },
      metaDescription: { type: String },
    },
    isActive: { type: Boolean, default: true, index: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete (ret as any).__v;
        return ret;
      },
    },
    toObject: {
      virtuals: true
    }
  }
);

// Setup a virtual field to populate the products belonging to this category
categorySchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'categoryId',
});

export const Category = model<TCategory>('Category', categorySchema);