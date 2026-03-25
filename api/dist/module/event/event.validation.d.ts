import { z } from 'zod';
export declare const createEventSchema: z.ZodObject<{
    body: z.ZodObject<{}, z.core.$strip>;
}, z.core.$strip>;
export declare const updateEventSchema: z.ZodObject<{
    body: z.ZodObject<{}, z.core.$strip>;
}, z.core.$strip>;
export declare const EventValidation: {
    createEventSchema: z.ZodObject<{
        body: z.ZodObject<{}, z.core.$strip>;
    }, z.core.$strip>;
    updateEventSchema: z.ZodObject<{
        body: z.ZodObject<{}, z.core.$strip>;
    }, z.core.$strip>;
};
//# sourceMappingURL=event.validation.d.ts.map