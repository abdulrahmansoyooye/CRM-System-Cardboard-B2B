import { z } from 'zod';
export declare const createIndustrySchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        overview: z.ZodOptional<z.ZodString>;
        relatedProducts: z.ZodOptional<z.ZodArray<z.ZodString>>;
        images: z.ZodOptional<z.ZodArray<z.ZodString>>;
        seo: z.ZodOptional<z.ZodObject<{
            metaTitle: z.ZodOptional<z.ZodString>;
            metaDescription: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>>;
        isActive: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strict>;
}, z.core.$strip>;
export declare const updateIndustrySchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        overview: z.ZodOptional<z.ZodString>;
        relatedProducts: z.ZodOptional<z.ZodArray<z.ZodString>>;
        images: z.ZodOptional<z.ZodArray<z.ZodString>>;
        seo: z.ZodOptional<z.ZodObject<{
            metaTitle: z.ZodOptional<z.ZodString>;
            metaDescription: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>>;
        isActive: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strict>;
}, z.core.$strip>;
export declare const IndustryValidation: {
    createIndustrySchema: z.ZodObject<{
        body: z.ZodObject<{
            name: z.ZodString;
            overview: z.ZodOptional<z.ZodString>;
            relatedProducts: z.ZodOptional<z.ZodArray<z.ZodString>>;
            images: z.ZodOptional<z.ZodArray<z.ZodString>>;
            seo: z.ZodOptional<z.ZodObject<{
                metaTitle: z.ZodOptional<z.ZodString>;
                metaDescription: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>>;
            isActive: z.ZodDefault<z.ZodBoolean>;
        }, z.core.$strict>;
    }, z.core.$strip>;
    updateIndustrySchema: z.ZodObject<{
        body: z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            overview: z.ZodOptional<z.ZodString>;
            relatedProducts: z.ZodOptional<z.ZodArray<z.ZodString>>;
            images: z.ZodOptional<z.ZodArray<z.ZodString>>;
            seo: z.ZodOptional<z.ZodObject<{
                metaTitle: z.ZodOptional<z.ZodString>;
                metaDescription: z.ZodOptional<z.ZodString>;
            }, z.core.$strict>>;
            isActive: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strict>;
    }, z.core.$strip>;
};
//# sourceMappingURL=industry.validation.d.ts.map