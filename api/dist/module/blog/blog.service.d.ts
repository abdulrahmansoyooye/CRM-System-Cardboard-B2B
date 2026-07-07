import { CreateBlogDTO, UpdateBlogDTO } from '../../types/dtos';
export declare const createBlog: (data: CreateBlogDTO) => Promise<import("mongoose").Document<unknown, {}, {
    slug: string;
    title: string;
    tags: string[];
    status: "draft" | "published";
    seo?: any;
    content?: string | null | undefined;
    excerpt?: string | null | undefined;
    category?: string | null | undefined;
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
    content?: string | null | undefined;
    excerpt?: string | null | undefined;
    category?: string | null | undefined;
    featuredImage?: string | null | undefined;
    publishedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
export declare const getAllBlogs: (query: Record<string, unknown>) => Promise<{
    result: (import("mongoose").Document<unknown, {}, {
        slug: string;
        title: string;
        tags: string[];
        status: "draft" | "published";
        seo?: any;
        content?: string | null | undefined;
        excerpt?: string | null | undefined;
        category?: string | null | undefined;
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
        content?: string | null | undefined;
        excerpt?: string | null | undefined;
        category?: string | null | undefined;
        featuredImage?: string | null | undefined;
        publishedAt?: NativeDate | null | undefined;
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
export declare const getBlogBySlug: (slug: string) => Promise<import("mongoose").Document<unknown, {}, {
    slug: string;
    title: string;
    tags: string[];
    status: "draft" | "published";
    seo?: any;
    content?: string | null | undefined;
    excerpt?: string | null | undefined;
    category?: string | null | undefined;
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
    content?: string | null | undefined;
    excerpt?: string | null | undefined;
    category?: string | null | undefined;
    featuredImage?: string | null | undefined;
    publishedAt?: NativeDate | null | undefined;
} & import("mongoose").DefaultTimestampProps & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}>;
export declare const updateBlog: (id: string, data: UpdateBlogDTO) => Promise<import("mongoose").Document<unknown, {}, {
    slug: string;
    title: string;
    tags: string[];
    status: "draft" | "published";
    seo?: any;
    content?: string | null | undefined;
    excerpt?: string | null | undefined;
    category?: string | null | undefined;
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
    content?: string | null | undefined;
    excerpt?: string | null | undefined;
    category?: string | null | undefined;
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
    content?: string | null | undefined;
    excerpt?: string | null | undefined;
    category?: string | null | undefined;
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
    content?: string | null | undefined;
    excerpt?: string | null | undefined;
    category?: string | null | undefined;
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
    createBlog: (data: CreateBlogDTO) => Promise<import("mongoose").Document<unknown, {}, {
        slug: string;
        title: string;
        tags: string[];
        status: "draft" | "published";
        seo?: any;
        content?: string | null | undefined;
        excerpt?: string | null | undefined;
        category?: string | null | undefined;
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
        content?: string | null | undefined;
        excerpt?: string | null | undefined;
        category?: string | null | undefined;
        featuredImage?: string | null | undefined;
        publishedAt?: NativeDate | null | undefined;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    getAllBlogs: (query: Record<string, unknown>) => Promise<{
        result: (import("mongoose").Document<unknown, {}, {
            slug: string;
            title: string;
            tags: string[];
            status: "draft" | "published";
            seo?: any;
            content?: string | null | undefined;
            excerpt?: string | null | undefined;
            category?: string | null | undefined;
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
            content?: string | null | undefined;
            excerpt?: string | null | undefined;
            category?: string | null | undefined;
            featuredImage?: string | null | undefined;
            publishedAt?: NativeDate | null | undefined;
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
    getBlogBySlug: (slug: string) => Promise<import("mongoose").Document<unknown, {}, {
        slug: string;
        title: string;
        tags: string[];
        status: "draft" | "published";
        seo?: any;
        content?: string | null | undefined;
        excerpt?: string | null | undefined;
        category?: string | null | undefined;
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
        content?: string | null | undefined;
        excerpt?: string | null | undefined;
        category?: string | null | undefined;
        featuredImage?: string | null | undefined;
        publishedAt?: NativeDate | null | undefined;
    } & import("mongoose").DefaultTimestampProps & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    updateBlog: (id: string, data: UpdateBlogDTO) => Promise<import("mongoose").Document<unknown, {}, {
        slug: string;
        title: string;
        tags: string[];
        status: "draft" | "published";
        seo?: any;
        content?: string | null | undefined;
        excerpt?: string | null | undefined;
        category?: string | null | undefined;
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
        content?: string | null | undefined;
        excerpt?: string | null | undefined;
        category?: string | null | undefined;
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
        content?: string | null | undefined;
        excerpt?: string | null | undefined;
        category?: string | null | undefined;
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
        content?: string | null | undefined;
        excerpt?: string | null | undefined;
        category?: string | null | undefined;
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