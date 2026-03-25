import { Schema } from 'mongoose';
export declare const jobSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    title: string;
    status: "open" | "closed";
    description?: string | null | undefined;
    department?: string | null | undefined;
    experience?: string | null | undefined;
    location?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    title: string;
    status: "open" | "closed";
    description?: string | null | undefined;
    department?: string | null | undefined;
    experience?: string | null | undefined;
    location?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, import("mongoose").MergeType<import("mongoose").DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    title: string;
    status: "open" | "closed";
    description?: string | null | undefined;
    department?: string | null | undefined;
    experience?: string | null | undefined;
    location?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    title: string;
    status: "open" | "closed";
    description?: string | null | undefined;
    department?: string | null | undefined;
    experience?: string | null | undefined;
    location?: string | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const Job: import("mongoose").Model<{
    title: string;
    status: "open" | "closed";
    description?: string | null | undefined;
    department?: string | null | undefined;
    experience?: string | null | undefined;
    location?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    title: string;
    status: "open" | "closed";
    description?: string | null | undefined;
    department?: string | null | undefined;
    experience?: string | null | undefined;
    location?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    title: string;
    status: "open" | "closed";
    description?: string | null | undefined;
    department?: string | null | undefined;
    experience?: string | null | undefined;
    location?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    title: string;
    status: "open" | "closed";
    description?: string | null | undefined;
    department?: string | null | undefined;
    experience?: string | null | undefined;
    location?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    title: string;
    status: "open" | "closed";
    description?: string | null | undefined;
    department?: string | null | undefined;
    experience?: string | null | undefined;
    location?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, import("mongoose").MergeType<import("mongoose").DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    title: string;
    status: "open" | "closed";
    description?: string | null | undefined;
    department?: string | null | undefined;
    experience?: string | null | undefined;
    location?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    title: string;
    status: "open" | "closed";
    description?: string | null | undefined;
    department?: string | null | undefined;
    experience?: string | null | undefined;
    location?: string | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>, {
    title: string;
    status: "open" | "closed";
    description?: string | null | undefined;
    department?: string | null | undefined;
    experience?: string | null | undefined;
    location?: string | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=job.model.d.ts.map