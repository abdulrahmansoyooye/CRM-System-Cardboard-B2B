import { Schema } from 'mongoose';
export declare const jobSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    type: "Full-Time" | "Part-Time" | "Shift Basis" | "Contract";
    title: string;
    status: "open" | "closed";
    description?: string | null | undefined;
    department?: string | null | undefined;
    experience?: string | null | undefined;
    location?: string | null | undefined;
    salary?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    type: "Full-Time" | "Part-Time" | "Shift Basis" | "Contract";
    title: string;
    status: "open" | "closed";
    description?: string | null | undefined;
    department?: string | null | undefined;
    experience?: string | null | undefined;
    location?: string | null | undefined;
    salary?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, import("mongoose").MergeType<import("mongoose").DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    type: "Full-Time" | "Part-Time" | "Shift Basis" | "Contract";
    title: string;
    status: "open" | "closed";
    description?: string | null | undefined;
    department?: string | null | undefined;
    experience?: string | null | undefined;
    location?: string | null | undefined;
    salary?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    type: "Full-Time" | "Part-Time" | "Shift Basis" | "Contract";
    title: string;
    status: "open" | "closed";
    description?: string | null | undefined;
    department?: string | null | undefined;
    experience?: string | null | undefined;
    location?: string | null | undefined;
    salary?: string | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const Job: import("mongoose").Model<{
    type: "Full-Time" | "Part-Time" | "Shift Basis" | "Contract";
    title: string;
    status: "open" | "closed";
    description?: string | null | undefined;
    department?: string | null | undefined;
    experience?: string | null | undefined;
    location?: string | null | undefined;
    salary?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    type: "Full-Time" | "Part-Time" | "Shift Basis" | "Contract";
    title: string;
    status: "open" | "closed";
    description?: string | null | undefined;
    department?: string | null | undefined;
    experience?: string | null | undefined;
    location?: string | null | undefined;
    salary?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    type: "Full-Time" | "Part-Time" | "Shift Basis" | "Contract";
    title: string;
    status: "open" | "closed";
    description?: string | null | undefined;
    department?: string | null | undefined;
    experience?: string | null | undefined;
    location?: string | null | undefined;
    salary?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    type: "Full-Time" | "Part-Time" | "Shift Basis" | "Contract";
    title: string;
    status: "open" | "closed";
    description?: string | null | undefined;
    department?: string | null | undefined;
    experience?: string | null | undefined;
    location?: string | null | undefined;
    salary?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    type: "Full-Time" | "Part-Time" | "Shift Basis" | "Contract";
    title: string;
    status: "open" | "closed";
    description?: string | null | undefined;
    department?: string | null | undefined;
    experience?: string | null | undefined;
    location?: string | null | undefined;
    salary?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, import("mongoose").MergeType<import("mongoose").DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    type: "Full-Time" | "Part-Time" | "Shift Basis" | "Contract";
    title: string;
    status: "open" | "closed";
    description?: string | null | undefined;
    department?: string | null | undefined;
    experience?: string | null | undefined;
    location?: string | null | undefined;
    salary?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    type: "Full-Time" | "Part-Time" | "Shift Basis" | "Contract";
    title: string;
    status: "open" | "closed";
    description?: string | null | undefined;
    department?: string | null | undefined;
    experience?: string | null | undefined;
    location?: string | null | undefined;
    salary?: string | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>, {
    type: "Full-Time" | "Part-Time" | "Shift Basis" | "Contract";
    title: string;
    status: "open" | "closed";
    description?: string | null | undefined;
    department?: string | null | undefined;
    experience?: string | null | undefined;
    location?: string | null | undefined;
    salary?: string | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=job.model.d.ts.map