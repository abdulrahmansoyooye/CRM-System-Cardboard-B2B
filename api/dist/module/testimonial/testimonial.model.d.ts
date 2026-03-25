import { Schema } from 'mongoose';
export declare const testimonialSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    clientName: string;
    feedback: string;
    isPublished: boolean;
    company?: string | null | undefined;
    rating?: number | null | undefined;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    clientName: string;
    feedback: string;
    isPublished: boolean;
    company?: string | null | undefined;
    rating?: number | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, import("mongoose").MergeType<import("mongoose").DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    clientName: string;
    feedback: string;
    isPublished: boolean;
    company?: string | null | undefined;
    rating?: number | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    clientName: string;
    feedback: string;
    isPublished: boolean;
    company?: string | null | undefined;
    rating?: number | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const Testimonial: import("mongoose").Model<{
    clientName: string;
    feedback: string;
    isPublished: boolean;
    company?: string | null | undefined;
    rating?: number | null | undefined;
} & import("mongoose").DefaultTimestampProps, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    clientName: string;
    feedback: string;
    isPublished: boolean;
    company?: string | null | undefined;
    rating?: number | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    clientName: string;
    feedback: string;
    isPublished: boolean;
    company?: string | null | undefined;
    rating?: number | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    clientName: string;
    feedback: string;
    isPublished: boolean;
    company?: string | null | undefined;
    rating?: number | null | undefined;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    clientName: string;
    feedback: string;
    isPublished: boolean;
    company?: string | null | undefined;
    rating?: number | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, import("mongoose").MergeType<import("mongoose").DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    clientName: string;
    feedback: string;
    isPublished: boolean;
    company?: string | null | undefined;
    rating?: number | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    clientName: string;
    feedback: string;
    isPublished: boolean;
    company?: string | null | undefined;
    rating?: number | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>, {
    clientName: string;
    feedback: string;
    isPublished: boolean;
    company?: string | null | undefined;
    rating?: number | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=testimonial.model.d.ts.map