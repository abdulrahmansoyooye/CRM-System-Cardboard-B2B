import { CreateIndustryDTO, UpdateIndustryDTO } from '../../types/dtos';
export declare const createIndustry: (data: CreateIndustryDTO) => Promise<import("mongoose").Document<unknown, {}, {
    name: string;
    slug: string;
    images: string[];
    isActive: boolean;
    relatedProducts: import("mongoose").Types.ObjectId[];
    seo?: any;
    overview?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    name: string;
    slug: string;
    images: string[];
    isActive: boolean;
    relatedProducts: import("mongoose").Types.ObjectId[];
    seo?: any;
    overview?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
export declare const getAllIndustrys: () => Promise<(import("mongoose").Document<unknown, {}, {
    name: string;
    slug: string;
    images: string[];
    isActive: boolean;
    relatedProducts: import("mongoose").Types.ObjectId[];
    seo?: any;
    overview?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    name: string;
    slug: string;
    images: string[];
    isActive: boolean;
    relatedProducts: import("mongoose").Types.ObjectId[];
    seo?: any;
    overview?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
})[]>;
export declare const getIndustryBySlug: (slug: string) => Promise<import("mongoose").Document<unknown, {}, {
    name: string;
    slug: string;
    images: string[];
    isActive: boolean;
    relatedProducts: import("mongoose").Types.ObjectId[];
    seo?: any;
    overview?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    name: string;
    slug: string;
    images: string[];
    isActive: boolean;
    relatedProducts: import("mongoose").Types.ObjectId[];
    seo?: any;
    overview?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
export declare const updateIndustry: (id: string, data: UpdateIndustryDTO) => Promise<import("mongoose").Document<unknown, {}, {
    name: string;
    slug: string;
    images: string[];
    isActive: boolean;
    relatedProducts: import("mongoose").Types.ObjectId[];
    seo?: any;
    overview?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    name: string;
    slug: string;
    images: string[];
    isActive: boolean;
    relatedProducts: import("mongoose").Types.ObjectId[];
    seo?: any;
    overview?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
export declare const deleteIndustry: (id: string) => Promise<import("mongoose").Document<unknown, {}, {
    name: string;
    slug: string;
    images: string[];
    isActive: boolean;
    relatedProducts: import("mongoose").Types.ObjectId[];
    seo?: any;
    overview?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    name: string;
    slug: string;
    images: string[];
    isActive: boolean;
    relatedProducts: import("mongoose").Types.ObjectId[];
    seo?: any;
    overview?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
export declare const IndustryService: {
    createIndustry: (data: CreateIndustryDTO) => Promise<import("mongoose").Document<unknown, {}, {
        name: string;
        slug: string;
        images: string[];
        isActive: boolean;
        relatedProducts: import("mongoose").Types.ObjectId[];
        seo?: any;
        overview?: string | null | undefined;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        name: string;
        slug: string;
        images: string[];
        isActive: boolean;
        relatedProducts: import("mongoose").Types.ObjectId[];
        seo?: any;
        overview?: string | null | undefined;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    getAllIndustrys: () => Promise<(import("mongoose").Document<unknown, {}, {
        name: string;
        slug: string;
        images: string[];
        isActive: boolean;
        relatedProducts: import("mongoose").Types.ObjectId[];
        seo?: any;
        overview?: string | null | undefined;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        name: string;
        slug: string;
        images: string[];
        isActive: boolean;
        relatedProducts: import("mongoose").Types.ObjectId[];
        seo?: any;
        overview?: string | null | undefined;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    })[]>;
    getIndustryBySlug: (slug: string) => Promise<import("mongoose").Document<unknown, {}, {
        name: string;
        slug: string;
        images: string[];
        isActive: boolean;
        relatedProducts: import("mongoose").Types.ObjectId[];
        seo?: any;
        overview?: string | null | undefined;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        name: string;
        slug: string;
        images: string[];
        isActive: boolean;
        relatedProducts: import("mongoose").Types.ObjectId[];
        seo?: any;
        overview?: string | null | undefined;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    updateIndustry: (id: string, data: UpdateIndustryDTO) => Promise<import("mongoose").Document<unknown, {}, {
        name: string;
        slug: string;
        images: string[];
        isActive: boolean;
        relatedProducts: import("mongoose").Types.ObjectId[];
        seo?: any;
        overview?: string | null | undefined;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        name: string;
        slug: string;
        images: string[];
        isActive: boolean;
        relatedProducts: import("mongoose").Types.ObjectId[];
        seo?: any;
        overview?: string | null | undefined;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    deleteIndustry: (id: string) => Promise<import("mongoose").Document<unknown, {}, {
        name: string;
        slug: string;
        images: string[];
        isActive: boolean;
        relatedProducts: import("mongoose").Types.ObjectId[];
        seo?: any;
        overview?: string | null | undefined;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        name: string;
        slug: string;
        images: string[];
        isActive: boolean;
        relatedProducts: import("mongoose").Types.ObjectId[];
        seo?: any;
        overview?: string | null | undefined;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
};
//# sourceMappingURL=industry.service.d.ts.map