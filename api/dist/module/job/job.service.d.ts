export declare const createJob: (data: any) => Promise<import("mongoose").Document<unknown, {}, {
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
}>;
export declare const getAllJobs: () => Promise<(import("mongoose").Document<unknown, {}, {
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
})[]>;
export declare const getJobById: (id: string) => Promise<import("mongoose").Document<unknown, {}, {
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
}>;
export declare const updateJob: (id: string, data: any) => Promise<import("mongoose").Document<unknown, {}, {
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
}>;
export declare const deleteJob: (id: string) => Promise<import("mongoose").Document<unknown, {}, {
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
}>;
export declare const JobService: {
    createJob: (data: any) => Promise<import("mongoose").Document<unknown, {}, {
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
    }>;
    getAllJobs: () => Promise<(import("mongoose").Document<unknown, {}, {
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
    })[]>;
    getJobById: (id: string) => Promise<import("mongoose").Document<unknown, {}, {
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
    }>;
    updateJob: (id: string, data: any) => Promise<import("mongoose").Document<unknown, {}, {
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
    }>;
    deleteJob: (id: string) => Promise<import("mongoose").Document<unknown, {}, {
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
    }>;
};
//# sourceMappingURL=job.service.d.ts.map