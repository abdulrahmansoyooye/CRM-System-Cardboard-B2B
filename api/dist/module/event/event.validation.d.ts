import { z } from 'zod';
export declare const createEventSchema: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        eventDate: z.ZodOptional<z.ZodString>;
        images: z.ZodOptional<z.ZodArray<z.ZodString>>;
        isFeatured: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strict>;
}, z.core.$strip>;
export declare const updateEventSchema: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        eventDate: z.ZodOptional<z.ZodString>;
        images: z.ZodOptional<z.ZodArray<z.ZodString>>;
        isFeatured: z.ZodOptional<z.ZodBoolean>;
    }, z.core.$strict>;
}, z.core.$strip>;
export declare const EventValidation: {
    createEventSchema: z.ZodObject<{
        body: z.ZodObject<{
            title: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            eventDate: z.ZodOptional<z.ZodString>;
            images: z.ZodOptional<z.ZodArray<z.ZodString>>;
            isFeatured: z.ZodDefault<z.ZodBoolean>;
        }, z.core.$strict>;
    }, z.core.$strip>;
    updateEventSchema: z.ZodObject<{
        body: z.ZodObject<{
            title: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            eventDate: z.ZodOptional<z.ZodString>;
            images: z.ZodOptional<z.ZodArray<z.ZodString>>;
            isFeatured: z.ZodOptional<z.ZodBoolean>;
        }, z.core.$strict>;
    }, z.core.$strip>;
};
//# sourceMappingURL=event.validation.d.ts.map