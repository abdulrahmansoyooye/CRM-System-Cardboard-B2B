export declare const createTestimonial: (data: any) => Promise<import("mongoose").Document<unknown, {}, {
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
}>;
export declare const getAllTestimonials: () => Promise<(import("mongoose").Document<unknown, {}, {
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
})[]>;
export declare const getTestimonialById: (id: string) => Promise<import("mongoose").Document<unknown, {}, {
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
}>;
export declare const updateTestimonial: (id: string, data: any) => Promise<import("mongoose").Document<unknown, {}, {
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
}>;
export declare const deleteTestimonial: (id: string) => Promise<import("mongoose").Document<unknown, {}, {
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
}>;
export declare const TestimonialService: {
    createTestimonial: (data: any) => Promise<import("mongoose").Document<unknown, {}, {
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
    }>;
    getAllTestimonials: () => Promise<(import("mongoose").Document<unknown, {}, {
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
    })[]>;
    getTestimonialById: (id: string) => Promise<import("mongoose").Document<unknown, {}, {
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
    }>;
    updateTestimonial: (id: string, data: any) => Promise<import("mongoose").Document<unknown, {}, {
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
    }>;
    deleteTestimonial: (id: string) => Promise<import("mongoose").Document<unknown, {}, {
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
    }>;
};
//# sourceMappingURL=testimonial.service.d.ts.map