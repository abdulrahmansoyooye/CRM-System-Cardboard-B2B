import { Schema } from 'mongoose';
export declare const blogSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    slug: string;
    title: string;
    tags: string[];
    status: "draft" | "published";
    seo?: any;
    category?: string | null | undefined;
    excerpt?: string | null | undefined;
    content?: string | null | undefined;
    featuredImage?: string | null | undefined;
    publishedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    slug: string;
    title: string;
    tags: string[];
    status: "draft" | "published";
    seo?: any;
    category?: string | null | undefined;
    excerpt?: string | null | undefined;
    content?: string | null | undefined;
    featuredImage?: string | null | undefined;
    publishedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, import("mongoose").MergeType<import("mongoose").DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    slug: string;
    title: string;
    tags: string[];
    status: "draft" | "published";
    seo?: any;
    category?: string | null | undefined;
    excerpt?: string | null | undefined;
    content?: string | null | undefined;
    featuredImage?: string | null | undefined;
    publishedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    slug: string;
    title: string;
    tags: string[];
    status: "draft" | "published";
    seo?: any;
    category?: string | null | undefined;
    excerpt?: string | null | undefined;
    content?: string | null | undefined;
    featuredImage?: string | null | undefined;
    publishedAt?: NativeDate | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const Blog: import("mongoose").Model<{
    slug: string;
    title: string;
    tags: string[];
    status: "draft" | "published";
    seo?: any;
    category?: string | null | undefined;
    excerpt?: string | null | undefined;
    content?: string | null | undefined;
    featuredImage?: string | null | undefined;
    publishedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    slug: string;
    title: string;
    tags: string[];
    status: "draft" | "published";
    seo?: any;
    category?: string | null | undefined;
    excerpt?: string | null | undefined;
    content?: string | null | undefined;
    featuredImage?: string | null | undefined;
    publishedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    slug: string;
    title: string;
    tags: string[];
    status: "draft" | "published";
    seo?: any;
    category?: string | null | undefined;
    excerpt?: string | null | undefined;
    content?: string | null | undefined;
    featuredImage?: string | null | undefined;
    publishedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    slug: string;
    title: string;
    tags: string[];
    status: "draft" | "published";
    seo?: any;
    category?: string | null | undefined;
    excerpt?: string | null | undefined;
    content?: string | null | undefined;
    featuredImage?: string | null | undefined;
    publishedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    slug: string;
    title: string;
    tags: string[];
    status: "draft" | "published";
    seo?: any;
    category?: string | null | undefined;
    excerpt?: string | null | undefined;
    content?: string | null | undefined;
    featuredImage?: string | null | undefined;
    publishedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, import("mongoose").MergeType<import("mongoose").DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    slug: string;
    title: string;
    tags: string[];
    status: "draft" | "published";
    seo?: any;
    category?: string | null | undefined;
    excerpt?: string | null | undefined;
    content?: string | null | undefined;
    featuredImage?: string | null | undefined;
    publishedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    slug: string;
    title: string;
    tags: string[];
    status: "draft" | "published";
    seo?: any;
    category?: string | null | undefined;
    excerpt?: string | null | undefined;
    content?: string | null | undefined;
    featuredImage?: string | null | undefined;
    publishedAt?: NativeDate | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>, {
    slug: string;
    title: string;
    tags: string[];
    status: "draft" | "published";
    seo?: any;
    category?: string | null | undefined;
    excerpt?: string | null | undefined;
    content?: string | null | undefined;
    featuredImage?: string | null | undefined;
    publishedAt?: NativeDate | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=blog.model.d.ts.map