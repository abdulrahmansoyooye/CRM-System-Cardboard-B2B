import { z } from 'zod';
export declare const CategoryValidation: {
    createCategorySchema: z.ZodObject<{
        body: z.ZodObject<{
            name: z.ZodString;
            slug: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            coverImage: z.ZodOptional<z.ZodString>;
            seo: z.ZodOptional<z.ZodObject<{
                metaTitle: z.ZodOptional<z.ZodString>;
                metaDescription: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>>;
            isActive: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strict>;
    }, z.core.$strip>;
    updateCategorySchema: z.ZodObject<{
        body: z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            slug: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            coverImage: z.ZodOptional<z.ZodString>;
            seo: z.ZodOptional<z.ZodObject<{
                metaTitle: z.ZodOptional<z.ZodString>;
                metaDescription: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>>;
            isActive: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strict>;
    }, z.core.$strip>;
};
//# sourceMappingURL=category.validation.d.ts.map