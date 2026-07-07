import { CreateSettingDTO, UpdateSettingDTO } from '../../types/dtos';
export declare const createSetting: (data: CreateSettingDTO) => Promise<import("mongoose").Document<unknown, {}, {
    companyName?: string | null | undefined;
    tagline?: string | null | undefined;
    logo?: string | null | undefined;
    favicon?: string | null | undefined;
    contactEmail?: string | null | undefined;
    contactPhone?: string | null | undefined;
    address?: string | null | undefined;
    socialLinks?: any;
    defaultSEO?: any;
    homepageHero?: any;
    ctaBanner?: any;
    analyticsId?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    companyName?: string | null | undefined;
    tagline?: string | null | undefined;
    logo?: string | null | undefined;
    favicon?: string | null | undefined;
    contactEmail?: string | null | undefined;
    contactPhone?: string | null | undefined;
    address?: string | null | undefined;
    socialLinks?: any;
    defaultSEO?: any;
    homepageHero?: any;
    ctaBanner?: any;
    analyticsId?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
export declare const getAllSettings: (query: Record<string, unknown>) => Promise<{
    result: (import("mongoose").Document<unknown, {}, {
        companyName?: string | null | undefined;
        tagline?: string | null | undefined;
        logo?: string | null | undefined;
        favicon?: string | null | undefined;
        contactEmail?: string | null | undefined;
        contactPhone?: string | null | undefined;
        address?: string | null | undefined;
        socialLinks?: any;
        defaultSEO?: any;
        homepageHero?: any;
        ctaBanner?: any;
        analyticsId?: string | null | undefined;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        companyName?: string | null | undefined;
        tagline?: string | null | undefined;
        logo?: string | null | undefined;
        favicon?: string | null | undefined;
        contactEmail?: string | null | undefined;
        contactPhone?: string | null | undefined;
        address?: string | null | undefined;
        socialLinks?: any;
        defaultSEO?: any;
        homepageHero?: any;
        ctaBanner?: any;
        analyticsId?: string | null | undefined;
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
export declare const getSettingById: (id: string) => Promise<import("mongoose").Document<unknown, {}, {
    companyName?: string | null | undefined;
    tagline?: string | null | undefined;
    logo?: string | null | undefined;
    favicon?: string | null | undefined;
    contactEmail?: string | null | undefined;
    contactPhone?: string | null | undefined;
    address?: string | null | undefined;
    socialLinks?: any;
    defaultSEO?: any;
    homepageHero?: any;
    ctaBanner?: any;
    analyticsId?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    companyName?: string | null | undefined;
    tagline?: string | null | undefined;
    logo?: string | null | undefined;
    favicon?: string | null | undefined;
    contactEmail?: string | null | undefined;
    contactPhone?: string | null | undefined;
    address?: string | null | undefined;
    socialLinks?: any;
    defaultSEO?: any;
    homepageHero?: any;
    ctaBanner?: any;
    analyticsId?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
export declare const updateSetting: (id: string, data: UpdateSettingDTO) => Promise<import("mongoose").Document<unknown, {}, {
    companyName?: string | null | undefined;
    tagline?: string | null | undefined;
    logo?: string | null | undefined;
    favicon?: string | null | undefined;
    contactEmail?: string | null | undefined;
    contactPhone?: string | null | undefined;
    address?: string | null | undefined;
    socialLinks?: any;
    defaultSEO?: any;
    homepageHero?: any;
    ctaBanner?: any;
    analyticsId?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    companyName?: string | null | undefined;
    tagline?: string | null | undefined;
    logo?: string | null | undefined;
    favicon?: string | null | undefined;
    contactEmail?: string | null | undefined;
    contactPhone?: string | null | undefined;
    address?: string | null | undefined;
    socialLinks?: any;
    defaultSEO?: any;
    homepageHero?: any;
    ctaBanner?: any;
    analyticsId?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
export declare const deleteSetting: (id: string) => Promise<import("mongoose").Document<unknown, {}, {
    companyName?: string | null | undefined;
    tagline?: string | null | undefined;
    logo?: string | null | undefined;
    favicon?: string | null | undefined;
    contactEmail?: string | null | undefined;
    contactPhone?: string | null | undefined;
    address?: string | null | undefined;
    socialLinks?: any;
    defaultSEO?: any;
    homepageHero?: any;
    ctaBanner?: any;
    analyticsId?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    companyName?: string | null | undefined;
    tagline?: string | null | undefined;
    logo?: string | null | undefined;
    favicon?: string | null | undefined;
    contactEmail?: string | null | undefined;
    contactPhone?: string | null | undefined;
    address?: string | null | undefined;
    socialLinks?: any;
    defaultSEO?: any;
    homepageHero?: any;
    ctaBanner?: any;
    analyticsId?: string | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
export declare const SettingService: {
    createSetting: (data: CreateSettingDTO) => Promise<import("mongoose").Document<unknown, {}, {
        companyName?: string | null | undefined;
        tagline?: string | null | undefined;
        logo?: string | null | undefined;
        favicon?: string | null | undefined;
        contactEmail?: string | null | undefined;
        contactPhone?: string | null | undefined;
        address?: string | null | undefined;
        socialLinks?: any;
        defaultSEO?: any;
        homepageHero?: any;
        ctaBanner?: any;
        analyticsId?: string | null | undefined;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        companyName?: string | null | undefined;
        tagline?: string | null | undefined;
        logo?: string | null | undefined;
        favicon?: string | null | undefined;
        contactEmail?: string | null | undefined;
        contactPhone?: string | null | undefined;
        address?: string | null | undefined;
        socialLinks?: any;
        defaultSEO?: any;
        homepageHero?: any;
        ctaBanner?: any;
        analyticsId?: string | null | undefined;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    getAllSettings: (query: Record<string, unknown>) => Promise<{
        result: (import("mongoose").Document<unknown, {}, {
            companyName?: string | null | undefined;
            tagline?: string | null | undefined;
            logo?: string | null | undefined;
            favicon?: string | null | undefined;
            contactEmail?: string | null | undefined;
            contactPhone?: string | null | undefined;
            address?: string | null | undefined;
            socialLinks?: any;
            defaultSEO?: any;
            homepageHero?: any;
            ctaBanner?: any;
            analyticsId?: string | null | undefined;
        } & import("mongoose").DefaultTimestampProps, {
            id: string;
        }, {
            timestamps: true;
        }> & Omit<{
            companyName?: string | null | undefined;
            tagline?: string | null | undefined;
            logo?: string | null | undefined;
            favicon?: string | null | undefined;
            contactEmail?: string | null | undefined;
            contactPhone?: string | null | undefined;
            address?: string | null | undefined;
            socialLinks?: any;
            defaultSEO?: any;
            homepageHero?: any;
            ctaBanner?: any;
            analyticsId?: string | null | undefined;
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
    getSettingById: (id: string) => Promise<import("mongoose").Document<unknown, {}, {
        companyName?: string | null | undefined;
        tagline?: string | null | undefined;
        logo?: string | null | undefined;
        favicon?: string | null | undefined;
        contactEmail?: string | null | undefined;
        contactPhone?: string | null | undefined;
        address?: string | null | undefined;
        socialLinks?: any;
        defaultSEO?: any;
        homepageHero?: any;
        ctaBanner?: any;
        analyticsId?: string | null | undefined;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        companyName?: string | null | undefined;
        tagline?: string | null | undefined;
        logo?: string | null | undefined;
        favicon?: string | null | undefined;
        contactEmail?: string | null | undefined;
        contactPhone?: string | null | undefined;
        address?: string | null | undefined;
        socialLinks?: any;
        defaultSEO?: any;
        homepageHero?: any;
        ctaBanner?: any;
        analyticsId?: string | null | undefined;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    updateSetting: (id: string, data: UpdateSettingDTO) => Promise<import("mongoose").Document<unknown, {}, {
        companyName?: string | null | undefined;
        tagline?: string | null | undefined;
        logo?: string | null | undefined;
        favicon?: string | null | undefined;
        contactEmail?: string | null | undefined;
        contactPhone?: string | null | undefined;
        address?: string | null | undefined;
        socialLinks?: any;
        defaultSEO?: any;
        homepageHero?: any;
        ctaBanner?: any;
        analyticsId?: string | null | undefined;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        companyName?: string | null | undefined;
        tagline?: string | null | undefined;
        logo?: string | null | undefined;
        favicon?: string | null | undefined;
        contactEmail?: string | null | undefined;
        contactPhone?: string | null | undefined;
        address?: string | null | undefined;
        socialLinks?: any;
        defaultSEO?: any;
        homepageHero?: any;
        ctaBanner?: any;
        analyticsId?: string | null | undefined;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    deleteSetting: (id: string) => Promise<import("mongoose").Document<unknown, {}, {
        companyName?: string | null | undefined;
        tagline?: string | null | undefined;
        logo?: string | null | undefined;
        favicon?: string | null | undefined;
        contactEmail?: string | null | undefined;
        contactPhone?: string | null | undefined;
        address?: string | null | undefined;
        socialLinks?: any;
        defaultSEO?: any;
        homepageHero?: any;
        ctaBanner?: any;
        analyticsId?: string | null | undefined;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        companyName?: string | null | undefined;
        tagline?: string | null | undefined;
        logo?: string | null | undefined;
        favicon?: string | null | undefined;
        contactEmail?: string | null | undefined;
        contactPhone?: string | null | undefined;
        address?: string | null | undefined;
        socialLinks?: any;
        defaultSEO?: any;
        homepageHero?: any;
        ctaBanner?: any;
        analyticsId?: string | null | undefined;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
};
//# sourceMappingURL=setting.service.d.ts.map