import { Schema } from 'mongoose';
export declare const jobApplicationSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    name: string;
    email: string;
    status: "new" | "reviewed" | "shortlisted" | "rejected";
    jobId: import("mongoose").Types.ObjectId;
    phone?: string | null | undefined;
    resumeFile?: string | null | undefined;
    notes?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    name: string;
    email: string;
    status: "new" | "reviewed" | "shortlisted" | "rejected";
    jobId: import("mongoose").Types.ObjectId;
    phone?: string | null | undefined;
    resumeFile?: string | null | undefined;
    notes?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, import("mongoose").MergeType<import("mongoose").DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    name: string;
    email: string;
    status: "new" | "reviewed" | "shortlisted" | "rejected";
    jobId: import("mongoose").Types.ObjectId;
    phone?: string | null | undefined;
    resumeFile?: string | null | undefined;
    notes?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    name: string;
    email: string;
    status: "new" | "reviewed" | "shortlisted" | "rejected";
    jobId: import("mongoose").Types.ObjectId;
    phone?: string | null | undefined;
    resumeFile?: string | null | undefined;
    notes?: string | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const JobApplication: import("mongoose").Model<{
    name: string;
    email: string;
    status: "new" | "reviewed" | "shortlisted" | "rejected";
    jobId: import("mongoose").Types.ObjectId;
    phone?: string | null | undefined;
    resumeFile?: string | null | undefined;
    notes?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, {}, {}, {
    id: string;
}, import("mongoose").Document<unknown, {}, {
    name: string;
    email: string;
    status: "new" | "reviewed" | "shortlisted" | "rejected";
    jobId: import("mongoose").Types.ObjectId;
    phone?: string | null | undefined;
    resumeFile?: string | null | undefined;
    notes?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    name: string;
    email: string;
    status: "new" | "reviewed" | "shortlisted" | "rejected";
    jobId: import("mongoose").Types.ObjectId;
    phone?: string | null | undefined;
    resumeFile?: string | null | undefined;
    notes?: string | null | undefined;
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
    email: string;
    status: "new" | "reviewed" | "shortlisted" | "rejected";
    jobId: import("mongoose").Types.ObjectId;
    phone?: string | null | undefined;
    resumeFile?: string | null | undefined;
    notes?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, import("mongoose").Document<unknown, {}, {
    name: string;
    email: string;
    status: "new" | "reviewed" | "shortlisted" | "rejected";
    jobId: import("mongoose").Types.ObjectId;
    phone?: string | null | undefined;
    resumeFile?: string | null | undefined;
    notes?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, import("mongoose").MergeType<import("mongoose").DefaultSchemaOptions, {
    timestamps: true;
}>> & Omit<{
    name: string;
    email: string;
    status: "new" | "reviewed" | "shortlisted" | "rejected";
    jobId: import("mongoose").Types.ObjectId;
    phone?: string | null | undefined;
    resumeFile?: string | null | undefined;
    notes?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, unknown, {
    name: string;
    email: string;
    status: "new" | "reviewed" | "shortlisted" | "rejected";
    jobId: import("mongoose").Types.ObjectId;
    phone?: string | null | undefined;
    resumeFile?: string | null | undefined;
    notes?: string | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>, {
    name: string;
    email: string;
    status: "new" | "reviewed" | "shortlisted" | "rejected";
    jobId: import("mongoose").Types.ObjectId;
    phone?: string | null | undefined;
    resumeFile?: string | null | undefined;
    notes?: string | null | undefined;
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
//# sourceMappingURL=job_application.model.d.ts.map