import { Types } from 'mongoose';
export type TProduct = {
    name: string;
    slug: string;
    categoryId: Types.ObjectId;
    shortDescription?: string;
    fullDescription?: string;
    specifications?: string[];
    materialDetails?: string;
    strengthDetails?: string;
    availableSizes?: string[];
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
export declare const Product: import("mongoose").Model<TProduct, {}, {}, {}, import("mongoose").Document<unknown, {}, TProduct, {}, import("mongoose").DefaultSchemaOptions> & TProduct & {
    _id: Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}, any, TProduct>;
//# sourceMappingURL=product.model.d.ts.map