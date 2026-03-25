export declare const createQuote: (data: any) => Promise<import("mongoose").Document<unknown, {}, {
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
export declare const getAllQuotes: () => Promise<(import("mongoose").Document<unknown, {}, {
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
})[]>;
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
export declare const updateQuote: (id: string, data: any) => Promise<import("mongoose").Document<unknown, {}, {
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
    createQuote: (data: any) => Promise<import("mongoose").Document<unknown, {}, {
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
    getAllQuotes: () => Promise<(import("mongoose").Document<unknown, {}, {
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
    })[]>;
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
    updateQuote: (id: string, data: any) => Promise<import("mongoose").Document<unknown, {}, {
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