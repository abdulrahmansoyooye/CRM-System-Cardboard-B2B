import { Schema } from 'mongoose';
export declare const eventSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    isFeatured: boolean;
    images: string[];
    title: string;
    description?: string | null | undefined;
    eventDate?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    isFeatured: boolean;
    images: string[];
    title: string;
    description?: string | null | undefined;
    eventDate?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, import("mongoose").MergeType<import("mongoose").DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    isFeatured: boolean;
    images: string[];
    title: string;
    description?: string | null | undefined;
    eventDate?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    isFeatured: boolean;
    images: string[];
    title: string;
    description?: string | null | undefined;
    eventDate?: NativeDate | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const Event: import("mongoose").Model<{
    isFeatured: boolean;
    images: string[];
    title: string;
    description?: string | null | undefined;
    eventDate?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    isFeatured: boolean;
    images: string[];
    title: string;
    description?: string | null | undefined;
    eventDate?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    isFeatured: boolean;
    images: string[];
    title: string;
    description?: string | null | undefined;
    eventDate?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    isFeatured: boolean;
    images: string[];
    title: string;
    description?: string | null | undefined;
    eventDate?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    isFeatured: boolean;
    images: string[];
    title: string;
    description?: string | null | undefined;
    eventDate?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, import("mongoose").MergeType<import("mongoose").DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    isFeatured: boolean;
    images: string[];
    title: string;
    description?: string | null | undefined;
    eventDate?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    isFeatured: boolean;
    images: string[];
    title: string;
    description?: string | null | undefined;
    eventDate?: NativeDate | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>, {
    isFeatured: boolean;
    images: string[];
    title: string;
    description?: string | null | undefined;
    eventDate?: NativeDate | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=event.model.d.ts.map