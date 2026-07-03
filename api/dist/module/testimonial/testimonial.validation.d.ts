import { z } from 'zod';
export declare const createTestimonialSchema: z.ZodObject<{
    body: z.ZodObject<{
        clientName: z.ZodString;
        company: z.ZodOptional<z.ZodString>;
        feedback: z.ZodString;
        rating: z.ZodOptional<z.ZodNumber>;
        isPublished: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strict>;
}, z.core.$strip>;
export declare const updateTestimonialSchema: z.ZodObject<{
    body: z.ZodObject<{
        clientName: z.ZodOptional<z.ZodString>;
        company: z.ZodOptional<z.ZodString>;
        feedback: z.ZodOptional<z.ZodString>;
        rating: z.ZodOptional<z.ZodNumber>;
        isPublished: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strict>;
}, z.core.$strip>;
export declare const TestimonialValidation: {
    createTestimonialSchema: z.ZodObject<{
        body: z.ZodObject<{
            clientName: z.ZodString;
            company: z.ZodOptional<z.ZodString>;
            feedback: z.ZodString;
            rating: z.ZodOptional<z.ZodNumber>;
            isPublished: z.ZodDefault<z.ZodBoolean>;
        }, z.core.$strict>;
    }, z.core.$strip>;
    updateTestimonialSchema: z.ZodObject<{
        body: z.ZodObject<{
            clientName: z.ZodOptional<z.ZodString>;
            company: z.ZodOptional<z.ZodString>;
            feedback: z.ZodOptional<z.ZodString>;
            rating: z.ZodOptional<z.ZodNumber>;
            isPublished: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strict>;
    }, z.core.$strip>;
};
//# sourceMappingURL=testimonial.validation.d.ts.map