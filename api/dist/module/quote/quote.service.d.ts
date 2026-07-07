import { CreateQuoteDTO, UpdateQuoteDTO } from '../../types/dtos';
export declare const createQuote: (data: CreateQuoteDTO) => Promise<import("mongoose").Document<unknown, {}, {
    name: string;
    email: string;
    status: string;
    phone?: string | null | undefined;
    notes?: string | null | undefined;
    productId?: import("mongoose").Types.ObjectId | null | undefined;
    quantity?: number | null | undefined;
    customizationDetails?: string | null | undefined;
    deliveryLocation?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    name: string;
    email: string;
    status: string;
    phone?: string | null | undefined;
    notes?: string | null | undefined;
    productId?: import("mongoose").Types.ObjectId | null | undefined;
    quantity?: number | null | undefined;
    customizationDetails?: string | null | undefined;
    deliveryLocation?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
export declare const getAllQuotes: (query: Record<string, unknown>) => Promise<{
    result: (import("mongoose").Document<unknown, {}, {
        name: string;
        email: string;
        status: string;
        phone?: string | null | undefined;
        notes?: string | null | undefined;
        productId?: import("mongoose").Types.ObjectId | null | undefined;
        quantity?: number | null | undefined;
        customizationDetails?: string | null | undefined;
        deliveryLocation?: string | null | undefined;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        name: string;
        email: string;
        status: string;
        phone?: string | null | undefined;
        notes?: string | null | undefined;
        productId?: import("mongoose").Types.ObjectId | null | undefined;
        quantity?: number | null | undefined;
        customizationDetails?: string | null | undefined;
        deliveryLocation?: string | null | undefined;
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
export declare const getQuoteById: (id: string) => Promise<import("mongoose").Document<unknown, {}, {
    name: string;
    email: string;
    status: string;
    phone?: string | null | undefined;
    notes?: string | null | undefined;
    productId?: import("mongoose").Types.ObjectId | null | undefined;
    quantity?: number | null | undefined;
    customizationDetails?: string | null | undefined;
    deliveryLocation?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    name: string;
    email: string;
    status: string;
    phone?: string | null | undefined;
    notes?: string | null | undefined;
    productId?: import("mongoose").Types.ObjectId | null | undefined;
    quantity?: number | null | undefined;
    customizationDetails?: string | null | undefined;
    deliveryLocation?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
export declare const updateQuote: (id: string, data: UpdateQuoteDTO) => Promise<import("mongoose").Document<unknown, {}, {
    name: string;
    email: string;
    status: string;
    phone?: string | null | undefined;
    notes?: string | null | undefined;
    productId?: import("mongoose").Types.ObjectId | null | undefined;
    quantity?: number | null | undefined;
    customizationDetails?: string | null | undefined;
    deliveryLocation?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    name: string;
    email: string;
    status: string;
    phone?: string | null | undefined;
    notes?: string | null | undefined;
    productId?: import("mongoose").Types.ObjectId | null | undefined;
    quantity?: number | null | undefined;
    customizationDetails?: string | null | undefined;
    deliveryLocation?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
export declare const deleteQuote: (id: string) => Promise<import("mongoose").Document<unknown, {}, {
    name: string;
    email: string;
    status: string;
    phone?: string | null | undefined;
    notes?: string | null | undefined;
    productId?: import("mongoose").Types.ObjectId | null | undefined;
    quantity?: number | null | undefined;
    customizationDetails?: string | null | undefined;
    deliveryLocation?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    name: string;
    email: string;
    status: string;
    phone?: string | null | undefined;
    notes?: string | null | undefined;
    productId?: import("mongoose").Types.ObjectId | null | undefined;
    quantity?: number | null | undefined;
    customizationDetails?: string | null | undefined;
    deliveryLocation?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
export declare const QuoteService: {
    createQuote: (data: CreateQuoteDTO) => Promise<import("mongoose").Document<unknown, {}, {
        name: string;
        email: string;
        status: string;
        phone?: string | null | undefined;
        notes?: string | null | undefined;
        productId?: import("mongoose").Types.ObjectId | null | undefined;
        quantity?: number | null | undefined;
        customizationDetails?: string | null | undefined;
        deliveryLocation?: string | null | undefined;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        name: string;
        email: string;
        status: string;
        phone?: string | null | undefined;
        notes?: string | null | undefined;
        productId?: import("mongoose").Types.ObjectId | null | undefined;
        quantity?: number | null | undefined;
        customizationDetails?: string | null | undefined;
        deliveryLocation?: string | null | undefined;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    getAllQuotes: (query: Record<string, unknown>) => Promise<{
        result: (import("mongoose").Document<unknown, {}, {
            name: string;
            email: string;
            status: string;
            phone?: string | null | undefined;
            notes?: string | null | undefined;
            productId?: import("mongoose").Types.ObjectId | null | undefined;
            quantity?: number | null | undefined;
            customizationDetails?: string | null | undefined;
            deliveryLocation?: string | null | undefined;
        } & import("mongoose").DefaultTimestampProps, {
            id: string;
        }, {
            timestamps: true;
        }> & Omit<{
            name: string;
            email: string;
            status: string;
            phone?: string | null | undefined;
            notes?: string | null | undefined;
            productId?: import("mongoose").Types.ObjectId | null | undefined;
            quantity?: number | null | undefined;
            customizationDetails?: string | null | undefined;
            deliveryLocation?: string | null | undefined;
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
    getQuoteById: (id: string) => Promise<import("mongoose").Document<unknown, {}, {
        name: string;
        email: string;
        status: string;
        phone?: string | null | undefined;
        notes?: string | null | undefined;
        productId?: import("mongoose").Types.ObjectId | null | undefined;
        quantity?: number | null | undefined;
        customizationDetails?: string | null | undefined;
        deliveryLocation?: string | null | undefined;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        name: string;
        email: string;
        status: string;
        phone?: string | null | undefined;
        notes?: string | null | undefined;
        productId?: import("mongoose").Types.ObjectId | null | undefined;
        quantity?: number | null | undefined;
        customizationDetails?: string | null | undefined;
        deliveryLocation?: string | null | undefined;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    updateQuote: (id: string, data: UpdateQuoteDTO) => Promise<import("mongoose").Document<unknown, {}, {
        name: string;
        email: string;
        status: string;
        phone?: string | null | undefined;
        notes?: string | null | undefined;
        productId?: import("mongoose").Types.ObjectId | null | undefined;
        quantity?: number | null | undefined;
        customizationDetails?: string | null | undefined;
        deliveryLocation?: string | null | undefined;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        name: string;
        email: string;
        status: string;
        phone?: string | null | undefined;
        notes?: string | null | undefined;
        productId?: import("mongoose").Types.ObjectId | null | undefined;
        quantity?: number | null | undefined;
        customizationDetails?: string | null | undefined;
        deliveryLocation?: string | null | undefined;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    deleteQuote: (id: string) => Promise<import("mongoose").Document<unknown, {}, {
        name: string;
        email: string;
        status: string;
        phone?: string | null | undefined;
        notes?: string | null | undefined;
        productId?: import("mongoose").Types.ObjectId | null | undefined;
        quantity?: number | null | undefined;
        customizationDetails?: string | null | undefined;
        deliveryLocation?: string | null | undefined;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        name: string;
        email: string;
        status: string;
        phone?: string | null | undefined;
        notes?: string | null | undefined;
        productId?: import("mongoose").Types.ObjectId | null | undefined;
        quantity?: number | null | undefined;
        customizationDetails?: string | null | undefined;
        deliveryLocation?: string | null | undefined;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
};
//# sourceMappingURL=quote.service.d.ts.map