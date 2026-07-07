import { CreateJobApplicationDTO, UpdateJobApplicationDTO } from '../../types/dtos';
export declare const createJobApplication: (data: CreateJobApplicationDTO) => Promise<import("mongoose").Document<unknown, {}, {
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
}>;
export declare const getAllJobApplications: (query: Record<string, unknown>) => Promise<{
    result: (import("mongoose").Document<unknown, {}, {
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
    })[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
    };
}>;
export declare const getJobApplicationById: (id: string) => Promise<import("mongoose").Document<unknown, {}, {
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
}>;
export declare const updateJobApplication: (id: string, data: UpdateJobApplicationDTO) => Promise<import("mongoose").Document<unknown, {}, {
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
}>;
export declare const deleteJobApplication: (id: string) => Promise<import("mongoose").Document<unknown, {}, {
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
}>;
export declare const JobApplicationService: {
    createJobApplication: (data: CreateJobApplicationDTO) => Promise<import("mongoose").Document<unknown, {}, {
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
    }>;
    getAllJobApplications: (query: Record<string, unknown>) => Promise<{
        result: (import("mongoose").Document<unknown, {}, {
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
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
    }>;
    getJobApplicationById: (id: string) => Promise<import("mongoose").Document<unknown, {}, {
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
    }>;
    updateJobApplication: (id: string, data: UpdateJobApplicationDTO) => Promise<import("mongoose").Document<unknown, {}, {
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
    }>;
    deleteJobApplication: (id: string) => Promise<import("mongoose").Document<unknown, {}, {
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
    }>;
};
//# sourceMappingURL=job_application.service.d.ts.map