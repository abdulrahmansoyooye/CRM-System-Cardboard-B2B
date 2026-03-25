import { Schema } from 'mongoose';
export declare const industrySchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    name: string;
    slug: string;
    images: string[];
    isActive: boolean;
    relatedProducts: import("mongoose").Types.ObjectId[];
    seo?: any;
    overview?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    name: string;
    slug: string;
    images: string[];
    isActive: boolean;
    relatedProducts: import("mongoose").Types.ObjectId[];
    seo?: any;
    overview?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, import("mongoose").MergeType<import("mongoose").DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    name: string;
    slug: string;
    images: string[];
    isActive: boolean;
    relatedProducts: import("mongoose").Types.ObjectId[];
    seo?: any;
    overview?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    name: string;
    slug: string;
    images: string[];
    isActive: boolean;
    relatedProducts: import("mongoose").Types.ObjectId[];
    seo?: any;
    overview?: string | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const Industry: import("mongoose").Model<{
    name: string;
    slug: string;
    images: string[];
    isActive: boolean;
    relatedProducts: import("mongoose").Types.ObjectId[];
    seo?: any;
    overview?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    name: string;
    slug: string;
    images: string[];
    isActive: boolean;
    relatedProducts: import("mongoose").Types.ObjectId[];
    seo?: any;
    overview?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    name: string;
    slug: string;
    images: string[];
    isActive: boolean;
    relatedProducts: import("mongoose").Types.ObjectId[];
    seo?: any;
    overview?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    name: string;
    slug: string;
    images: string[];
    isActive: boolean;
    relatedProducts: import("mongoose").Types.ObjectId[];
    seo?: any;
    overview?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    name: string;
    slug: string;
    images: string[];
    isActive: boolean;
    relatedProducts: import("mongoose").Types.ObjectId[];
    seo?: any;
    overview?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, import("mongoose").MergeType<import("mongoose").DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    name: string;
    slug: string;
    images: string[];
    isActive: boolean;
    relatedProducts: import("mongoose").Types.ObjectId[];
    seo?: any;
    overview?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    name: string;
    slug: string;
    images: string[];
    isActive: boolean;
    relatedProducts: import("mongoose").Types.ObjectId[];
    seo?: any;
    overview?: string | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>, {
    name: string;
    slug: string;
    images: string[];
    isActive: boolean;
    relatedProducts: import("mongoose").Types.ObjectId[];
    seo?: any;
    overview?: string | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=industry.model.d.ts.map