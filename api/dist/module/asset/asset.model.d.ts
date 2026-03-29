import { Schema } from 'mongoose';
export declare const assetSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    name: string;
    category: string;
    url: string;
    type?: string | null | undefined;
    size?: string | null | undefined;
    dimensions?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    name: string;
    category: string;
    url: string;
    type?: string | null | undefined;
    size?: string | null | undefined;
    dimensions?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, import("mongoose").MergeType<import("mongoose").DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    name: string;
    category: string;
    url: string;
    type?: string | null | undefined;
    size?: string | null | undefined;
    dimensions?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    name: string;
    category: string;
    url: string;
    type?: string | null | undefined;
    size?: string | null | undefined;
    dimensions?: string | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const Asset: import("mongoose").Model<{
    name: string;
    category: string;
    url: string;
    type?: string | null | undefined;
    size?: string | null | undefined;
    dimensions?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    name: string;
    category: string;
    url: string;
    type?: string | null | undefined;
    size?: string | null | undefined;
    dimensions?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    name: string;
    category: string;
    url: string;
    type?: string | null | undefined;
    size?: string | null | undefined;
    dimensions?: string | null | undefined;
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
    category: string;
    url: string;
    type?: string | null | undefined;
    size?: string | null | undefined;
    dimensions?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    name: string;
    category: string;
    url: string;
    type?: string | null | undefined;
    size?: string | null | undefined;
    dimensions?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, import("mongoose").MergeType<import("mongoose").DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    name: string;
    category: string;
    url: string;
    type?: string | null | undefined;
    size?: string | null | undefined;
    dimensions?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    name: string;
    category: string;
    url: string;
    type?: string | null | undefined;
    size?: string | null | undefined;
    dimensions?: string | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>, {
    name: string;
    category: string;
    url: string;
    type?: string | null | undefined;
    size?: string | null | undefined;
    dimensions?: string | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=asset.model.d.ts.map