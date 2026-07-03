import { z } from 'zod';
export declare const createBlogSchema: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodString;
        category: z.ZodOptional<z.ZodString>;
        excerpt: z.ZodOptional<z.ZodString>;
        content: z.ZodOptional<z.ZodString>;
        featuredImage: z.ZodOptional<z.ZodString>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString>>;
        seo: z.ZodOptional<z.ZodObject<{
            metaTitle: z.ZodOptional<z.ZodString>;
            metaDescription: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>>;
        status: z.ZodDefault<z.ZodEnum<{
            draft: "draft";
            published: "published";
        }>>;
    }, z.core.$strict>;
}, z.core.$strip>;
export declare const updateBlogSchema: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        category: z.ZodOptional<z.ZodString>;
        excerpt: z.ZodOptional<z.ZodString>;
        content: z.ZodOptional<z.ZodString>;
        featuredImage: z.ZodOptional<z.ZodString>;
        tags: z.ZodOptional<z.ZodArray<z.ZodString>>;
        seo: z.ZodOptional<z.ZodObject<{
            metaTitle: z.ZodOptional<z.ZodString>;
            metaDescription: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>>;
        status: z.ZodOptional<z.ZodEnum<{
            draft: "draft";
            published: "published";
        }>>;
    }, z.core.$strict>;
}, z.core.$strip>;
export declare const BlogValidation: {
    createBlogSchema: z.ZodObject<{
        body: z.ZodObject<{
            title: z.ZodString;
            category: z.ZodOptional<z.ZodString>;
            excerpt: z.ZodOptional<z.ZodString>;
            content: z.ZodOptional<z.ZodString>;
            featuredImage: z.ZodOptional<z.ZodString>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString>>;
            seo: z.ZodOptional<z.ZodObject<{
                metaTitle: z.ZodOptional<z.ZodString>;
                metaDescription: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>>;
            status: z.ZodDefault<z.ZodEnum<{
                draft: "draft";
                published: "published";
            }>>;
        }, z.core.$strict>;
    }, z.core.$strip>;
    updateBlogSchema: z.ZodObject<{
        body: z.ZodObject<{
            title: z.ZodOptional<z.ZodString>;
            category: z.ZodOptional<z.ZodString>;
            excerpt: z.ZodOptional<z.ZodString>;
            content: z.ZodOptional<z.ZodString>;
            featuredImage: z.ZodOptional<z.ZodString>;
            tags: z.ZodOptional<z.ZodArray<z.ZodString>>;
            seo: z.ZodOptional<z.ZodObject<{
                metaTitle: z.ZodOptional<z.ZodString>;
                metaDescription: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>>;
            status: z.ZodOptional<z.ZodEnum<{
                draft: "draft";
                published: "published";
            }>>;
        }, z.core.$strict>;
    }, z.core.$strip>;
};
//# sourceMappingURL=blog.validation.d.ts.map