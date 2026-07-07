import { CreateInquiryDTO, UpdateInquiryDTO } from '../../types/dtos';
export declare const createInquiry: (data: CreateInquiryDTO) => Promise<import("mongoose").Document<unknown, {}, {
    name: string;
    email: string;
    status: "new" | "closed" | "contacted" | "quoted";
    message?: string | null | undefined;
    phone?: string | null | undefined;
    notes?: string | null | undefined;
    company?: string | null | undefined;
    productInterested?: string | null | undefined;
    assignedTo?: import("mongoose").Types.ObjectId | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    name: string;
    email: string;
    status: "new" | "closed" | "contacted" | "quoted";
    message?: string | null | undefined;
    phone?: string | null | undefined;
    notes?: string | null | undefined;
    company?: string | null | undefined;
    productInterested?: string | null | undefined;
    assignedTo?: import("mongoose").Types.ObjectId | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
export declare const getAllInquirys: (query: Record<string, unknown>) => Promise<{
    result: (import("mongoose").Document<unknown, {}, {
        name: string;
        email: string;
        status: "new" | "closed" | "contacted" | "quoted";
        message?: string | null | undefined;
        phone?: string | null | undefined;
        notes?: string | null | undefined;
        company?: string | null | undefined;
        productInterested?: string | null | undefined;
        assignedTo?: import("mongoose").Types.ObjectId | null | undefined;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        name: string;
        email: string;
        status: "new" | "closed" | "contacted" | "quoted";
        message?: string | null | undefined;
        phone?: string | null | undefined;
        notes?: string | null | undefined;
        company?: string | null | undefined;
        productInterested?: string | null | undefined;
        assignedTo?: import("mongoose").Types.ObjectId | null | undefined;
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
export declare const getInquiryById: (id: string) => Promise<import("mongoose").Document<unknown, {}, {
    name: string;
    email: string;
    status: "new" | "closed" | "contacted" | "quoted";
    message?: string | null | undefined;
    phone?: string | null | undefined;
    notes?: string | null | undefined;
    company?: string | null | undefined;
    productInterested?: string | null | undefined;
    assignedTo?: import("mongoose").Types.ObjectId | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    name: string;
    email: string;
    status: "new" | "closed" | "contacted" | "quoted";
    message?: string | null | undefined;
    phone?: string | null | undefined;
    notes?: string | null | undefined;
    company?: string | null | undefined;
    productInterested?: string | null | undefined;
    assignedTo?: import("mongoose").Types.ObjectId | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
export declare const updateInquiry: (id: string, data: UpdateInquiryDTO) => Promise<import("mongoose").Document<unknown, {}, {
    name: string;
    email: string;
    status: "new" | "closed" | "contacted" | "quoted";
    message?: string | null | undefined;
    phone?: string | null | undefined;
    notes?: string | null | undefined;
    company?: string | null | undefined;
    productInterested?: string | null | undefined;
    assignedTo?: import("mongoose").Types.ObjectId | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    name: string;
    email: string;
    status: "new" | "closed" | "contacted" | "quoted";
    message?: string | null | undefined;
    phone?: string | null | undefined;
    notes?: string | null | undefined;
    company?: string | null | undefined;
    productInterested?: string | null | undefined;
    assignedTo?: import("mongoose").Types.ObjectId | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
export declare const deleteInquiry: (id: string) => Promise<import("mongoose").Document<unknown, {}, {
    name: string;
    email: string;
    status: "new" | "closed" | "contacted" | "quoted";
    message?: string | null | undefined;
    phone?: string | null | undefined;
    notes?: string | null | undefined;
    company?: string | null | undefined;
    productInterested?: string | null | undefined;
    assignedTo?: import("mongoose").Types.ObjectId | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    name: string;
    email: string;
    status: "new" | "closed" | "contacted" | "quoted";
    message?: string | null | undefined;
    phone?: string | null | undefined;
    notes?: string | null | undefined;
    company?: string | null | undefined;
    productInterested?: string | null | undefined;
    assignedTo?: import("mongoose").Types.ObjectId | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
export declare const InquiryService: {
    createInquiry: (data: CreateInquiryDTO) => Promise<import("mongoose").Document<unknown, {}, {
        name: string;
        email: string;
        status: "new" | "closed" | "contacted" | "quoted";
        message?: string | null | undefined;
        phone?: string | null | undefined;
        notes?: string | null | undefined;
        company?: string | null | undefined;
        productInterested?: string | null | undefined;
        assignedTo?: import("mongoose").Types.ObjectId | null | undefined;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        name: string;
        email: string;
        status: "new" | "closed" | "contacted" | "quoted";
        message?: string | null | undefined;
        phone?: string | null | undefined;
        notes?: string | null | undefined;
        company?: string | null | undefined;
        productInterested?: string | null | undefined;
        assignedTo?: import("mongoose").Types.ObjectId | null | undefined;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    getAllInquirys: (query: Record<string, unknown>) => Promise<{
        result: (import("mongoose").Document<unknown, {}, {
            name: string;
            email: string;
            status: "new" | "closed" | "contacted" | "quoted";
            message?: string | null | undefined;
            phone?: string | null | undefined;
            notes?: string | null | undefined;
            company?: string | null | undefined;
            productInterested?: string | null | undefined;
            assignedTo?: import("mongoose").Types.ObjectId | null | undefined;
        } & import("mongoose").DefaultTimestampProps, {
            id: string;
        }, {
            timestamps: true;
        }> & Omit<{
            name: string;
            email: string;
            status: "new" | "closed" | "contacted" | "quoted";
            message?: string | null | undefined;
            phone?: string | null | undefined;
            notes?: string | null | undefined;
            company?: string | null | undefined;
            productInterested?: string | null | undefined;
            assignedTo?: import("mongoose").Types.ObjectId | null | undefined;
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
    getInquiryById: (id: string) => Promise<import("mongoose").Document<unknown, {}, {
        name: string;
        email: string;
        status: "new" | "closed" | "contacted" | "quoted";
        message?: string | null | undefined;
        phone?: string | null | undefined;
        notes?: string | null | undefined;
        company?: string | null | undefined;
        productInterested?: string | null | undefined;
        assignedTo?: import("mongoose").Types.ObjectId | null | undefined;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        name: string;
        email: string;
        status: "new" | "closed" | "contacted" | "quoted";
        message?: string | null | undefined;
        phone?: string | null | undefined;
        notes?: string | null | undefined;
        company?: string | null | undefined;
        productInterested?: string | null | undefined;
        assignedTo?: import("mongoose").Types.ObjectId | null | undefined;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    updateInquiry: (id: string, data: UpdateInquiryDTO) => Promise<import("mongoose").Document<unknown, {}, {
        name: string;
        email: string;
        status: "new" | "closed" | "contacted" | "quoted";
        message?: string | null | undefined;
        phone?: string | null | undefined;
        notes?: string | null | undefined;
        company?: string | null | undefined;
        productInterested?: string | null | undefined;
        assignedTo?: import("mongoose").Types.ObjectId | null | undefined;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        name: string;
        email: string;
        status: "new" | "closed" | "contacted" | "quoted";
        message?: string | null | undefined;
        phone?: string | null | undefined;
        notes?: string | null | undefined;
        company?: string | null | undefined;
        productInterested?: string | null | undefined;
        assignedTo?: import("mongoose").Types.ObjectId | null | undefined;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    deleteInquiry: (id: string) => Promise<import("mongoose").Document<unknown, {}, {
        name: string;
        email: string;
        status: "new" | "closed" | "contacted" | "quoted";
        message?: string | null | undefined;
        phone?: string | null | undefined;
        notes?: string | null | undefined;
        company?: string | null | undefined;
        productInterested?: string | null | undefined;
        assignedTo?: import("mongoose").Types.ObjectId | null | undefined;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        name: string;
        email: string;
        status: "new" | "closed" | "contacted" | "quoted";
        message?: string | null | undefined;
        phone?: string | null | undefined;
        notes?: string | null | undefined;
        company?: string | null | undefined;
        productInterested?: string | null | undefined;
        assignedTo?: import("mongoose").Types.ObjectId | null | undefined;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
};
//# sourceMappingURL=inquiry.service.d.ts.map