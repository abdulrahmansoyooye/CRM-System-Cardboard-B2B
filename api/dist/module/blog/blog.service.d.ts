export declare const createBlog: (data: any) => Promise<import("mongoose").Document<unknown, {}, {
    slug: string;
    title: string;
    tags: string[];
    status: "draft" | "published";
    seo?: any;
    category?: string | null | undefined;
    excerpt?: string | null | undefined;
    content?: string | null | undefined;
    featuredImage?: string | null | undefined;
    publishedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    slug: string;
    title: string;
    tags: string[];
    status: "draft" | "published";
    seo?: any;
    category?: string | null | undefined;
    excerpt?: string | null | undefined;
    content?: string | null | undefined;
    featuredImage?: string | null | undefined;
    publishedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
export declare const getAllBlogs: () => Promise<(import("mongoose").Document<unknown, {}, {
    slug: string;
    title: string;
    tags: string[];
    status: "draft" | "published";
    seo?: any;
    category?: string | null | undefined;
    excerpt?: string | null | undefined;
    content?: string | null | undefined;
    featuredImage?: string | null | undefined;
    publishedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    slug: string;
    title: string;
    tags: string[];
    status: "draft" | "published";
    seo?: any;
    category?: string | null | undefined;
    excerpt?: string | null | undefined;
    content?: string | null | undefined;
    featuredImage?: string | null | undefined;
    publishedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
})[]>;
export declare const getBlogBySlug: (slug: string) => Promise<import("mongoose").Document<unknown, {}, {
    slug: string;
    title: string;
    tags: string[];
    status: "draft" | "published";
    seo?: any;
    category?: string | null | undefined;
    excerpt?: string | null | undefined;
    content?: string | null | undefined;
    featuredImage?: string | null | undefined;
    publishedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    slug: string;
    title: string;
    tags: string[];
    status: "draft" | "published";
    seo?: any;
    category?: string | null | undefined;
    excerpt?: string | null | undefined;
    content?: string | null | undefined;
    featuredImage?: string | null | undefined;
    publishedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
export declare const updateBlog: (id: string, data: any) => Promise<import("mongoose").Document<unknown, {}, {
    slug: string;
    title: string;
    tags: string[];
    status: "draft" | "published";
    seo?: any;
    category?: string | null | undefined;
    excerpt?: string | null | undefined;
    content?: string | null | undefined;
    featuredImage?: string | null | undefined;
    publishedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    slug: string;
    title: string;
    tags: string[];
    status: "draft" | "published";
    seo?: any;
    category?: string | null | undefined;
    excerpt?: string | null | undefined;
    content?: string | null | undefined;
    featuredImage?: string | null | undefined;
    publishedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
export declare const deleteBlog: (id: string) => Promise<import("mongoose").Document<unknown, {}, {
    slug: string;
    title: string;
    tags: string[];
    status: "draft" | "published";
    seo?: any;
    category?: string | null | undefined;
    excerpt?: string | null | undefined;
    content?: string | null | undefined;
    featuredImage?: string | null | undefined;
    publishedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps, {
    id: string;
}, {
    timestamps: true;
}> & Omit<{
    slug: string;
    title: string;
    tags: string[];
    status: "draft" | "published";
    seo?: any;
    category?: string | null | undefined;
    excerpt?: string | null | undefined;
    content?: string | null | undefined;
    featuredImage?: string | null | undefined;
    publishedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
export declare const BlogService: {
    createBlog: (data: any) => Promise<import("mongoose").Document<unknown, {}, {
        slug: string;
        title: string;
        tags: string[];
        status: "draft" | "published";
        seo?: any;
        category?: string | null | undefined;
        excerpt?: string | null | undefined;
        content?: string | null | undefined;
        featuredImage?: string | null | undefined;
        publishedAt?: NativeDate | null | undefined;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        slug: string;
        title: string;
        tags: string[];
        status: "draft" | "published";
        seo?: any;
        category?: string | null | undefined;
        excerpt?: string | null | undefined;
        content?: string | null | undefined;
        featuredImage?: string | null | undefined;
        publishedAt?: NativeDate | null | undefined;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    getAllBlogs: () => Promise<(import("mongoose").Document<unknown, {}, {
        slug: string;
        title: string;
        tags: string[];
        status: "draft" | "published";
        seo?: any;
        category?: string | null | undefined;
        excerpt?: string | null | undefined;
        content?: string | null | undefined;
        featuredImage?: string | null | undefined;
        publishedAt?: NativeDate | null | undefined;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        slug: string;
        title: string;
        tags: string[];
        status: "draft" | "published";
        seo?: any;
        category?: string | null | undefined;
        excerpt?: string | null | undefined;
        content?: string | null | undefined;
        featuredImage?: string | null | undefined;
        publishedAt?: NativeDate | null | undefined;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    })[]>;
    getBlogBySlug: (slug: string) => Promise<import("mongoose").Document<unknown, {}, {
        slug: string;
        title: string;
        tags: string[];
        status: "draft" | "published";
        seo?: any;
        category?: string | null | undefined;
        excerpt?: string | null | undefined;
        content?: string | null | undefined;
        featuredImage?: string | null | undefined;
        publishedAt?: NativeDate | null | undefined;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        slug: string;
        title: string;
        tags: string[];
        status: "draft" | "published";
        seo?: any;
        category?: string | null | undefined;
        excerpt?: string | null | undefined;
        content?: string | null | undefined;
        featuredImage?: string | null | undefined;
        publishedAt?: NativeDate | null | undefined;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    updateBlog: (id: string, data: any) => Promise<import("mongoose").Document<unknown, {}, {
        slug: string;
        title: string;
        tags: string[];
        status: "draft" | "published";
        seo?: any;
        category?: string | null | undefined;
        excerpt?: string | null | undefined;
        content?: string | null | undefined;
        featuredImage?: string | null | undefined;
        publishedAt?: NativeDate | null | undefined;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        slug: string;
        title: string;
        tags: string[];
        status: "draft" | "published";
        seo?: any;
        category?: string | null | undefined;
        excerpt?: string | null | undefined;
        content?: string | null | undefined;
        featuredImage?: string | null | undefined;
        publishedAt?: NativeDate | null | undefined;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    deleteBlog: (id: string) => Promise<import("mongoose").Document<unknown, {}, {
        slug: string;
        title: string;
        tags: string[];
        status: "draft" | "published";
        seo?: any;
        category?: string | null | undefined;
        excerpt?: string | null | undefined;
        content?: string | null | undefined;
        featuredImage?: string | null | undefined;
        publishedAt?: NativeDate | null | undefined;
    } & import("mongoose").DefaultTimestampProps, {
        id: string;
    }, {
        timestamps: true;
    }> & Omit<{
        slug: string;
        title: string;
        tags: string[];
        status: "draft" | "published";
        seo?: any;
        category?: string | null | undefined;
        excerpt?: string | null | undefined;
        content?: string | null | undefined;
        featuredImage?: string | null | undefined;
        publishedAt?: NativeDate | null | undefined;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
};
//# sourceMappingURL=blog.service.d.ts.map