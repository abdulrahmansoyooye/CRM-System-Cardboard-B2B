export declare const createSetting: (data: any) => Promise<import("mongoose").Document<unknown, {}, {
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
export declare const getAllSettings: () => Promise<(import("mongoose").Document<unknown, {}, {
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
})[]>;
export declare const getSettingById: (id: string) => Promise<import("mongoose").Document<unknown, {}, {
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
export declare const updateSetting: (id: string, data: any) => Promise<import("mongoose").Document<unknown, {}, {
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
    createSetting: (data: any) => Promise<import("mongoose").Document<unknown, {}, {
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
    getAllSettings: () => Promise<(import("mongoose").Document<unknown, {}, {
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
    })[]>;
    getSettingById: (id: string) => Promise<import("mongoose").Document<unknown, {}, {
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
    updateSetting: (id: string, data: any) => Promise<import("mongoose").Document<unknown, {}, {
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