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
export declare const getAllIndustrys: (query: Record<string, unknown>) => Promise<{
    result: (import("mongoose").Document<unknown, {}, {
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
    })[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPage: number;
    };
}>;
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
    getAllIndustrys: (query: Record<string, unknown>) => Promise<{
        result: (import("mongoose").Document<unknown, {}, {
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
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
    }>;
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