import { z } from 'zod';
export declare const createBlogSchema: z.ZodObject<{
    body: z.ZodObject<{}, z.core.$strip>;
}, z.core.$strip>;
export declare const updateBlogSchema: z.ZodObject<{
    body: z.ZodObject<{}, z.core.$strip>;
}, z.core.$strip>;
export declare const BlogValidation: {
    createBlogSchema: z.ZodObject<{
        body: z.ZodObject<{}, z.core.$strip>;
    }, z.core.$strip>;
    updateBlogSchema: z.ZodObject<{
        body: z.ZodObject<{}, z.core.$strip>;
    }, z.core.$strip>;
};
//# sourceMappingURL=blog.validation.d.ts.map