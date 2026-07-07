import { CreateJobDTO, UpdateJobDTO } from '../../types/dtos';
export declare const createJob: (data: CreateJobDTO) => Promise<import("mongoose").Document<unknown, {}, {
    type: "Full-Time" | "Part-Time" | "Shift Basis" | "Contract";
    title: string;
    status: "closed" | "open";
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
    status: "closed" | "open";
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
}>;
export declare const getAllJobs: (query: Record<string, unknown>) => Promise<{
    result: (import("mongoose").Document<unknown, {}, {
        type: "Full-Time" | "Part-Time" | "Shift Basis" | "Contract";
        title: string;
        status: "closed" | "open";
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
        status: "closed" | "open";
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
    })[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
    };
}>;
export declare const getJobById: (id: string) => Promise<import("mongoose").Document<unknown, {}, {
    type: "Full-Time" | "Part-Time" | "Shift Basis" | "Contract";
    title: string;
    status: "closed" | "open";
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
    status: "closed" | "open";
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
}>;
export declare const updateJob: (id: string, data: UpdateJobDTO) => Promise<import("mongoose").Document<unknown, {}, {
    type: "Full-Time" | "Part-Time" | "Shift Basis" | "Contract";
    title: string;
    status: "closed" | "open";
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
    status: "closed" | "open";
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
}>;
export declare const deleteJob: (id: string) => Promise<import("mongoose").Document<unknown, {}, {
    type: "Full-Time" | "Part-Time" | "Shift Basis" | "Contract";
    title: string;
    status: "closed" | "open";
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
    status: "closed" | "open";
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
}>;
export declare const JobService: {
    createJob: (data: CreateJobDTO) => Promise<import("mongoose").Document<unknown, {}, {
        type: "Full-Time" | "Part-Time" | "Shift Basis" | "Contract";
        title: string;
        status: "closed" | "open";
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
        status: "closed" | "open";
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
    }>;
    getAllJobs: (query: Record<string, unknown>) => Promise<{
        result: (import("mongoose").Document<unknown, {}, {
            type: "Full-Time" | "Part-Time" | "Shift Basis" | "Contract";
            title: string;
            status: "closed" | "open";
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
            status: "closed" | "open";
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
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
    }>;
    getJobById: (id: string) => Promise<import("mongoose").Document<unknown, {}, {
        type: "Full-Time" | "Part-Time" | "Shift Basis" | "Contract";
        title: string;
        status: "closed" | "open";
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
        status: "closed" | "open";
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
    }>;
    updateJob: (id: string, data: UpdateJobDTO) => Promise<import("mongoose").Document<unknown, {}, {
        type: "Full-Time" | "Part-Time" | "Shift Basis" | "Contract";
        title: string;
        status: "closed" | "open";
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
        status: "closed" | "open";
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
    }>;
    deleteJob: (id: string) => Promise<import("mongoose").Document<unknown, {}, {
        type: "Full-Time" | "Part-Time" | "Shift Basis" | "Contract";
        title: string;
        status: "closed" | "open";
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
        status: "closed" | "open";
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
    }>;
};
//# sourceMappingURL=job.service.d.ts.map