import { z } from 'zod';
export declare const createJobSchema: z.ZodObject<{
    body: z.ZodObject<{}, z.core.$strip>;
}, z.core.$strip>;
export declare const updateJobSchema: z.ZodObject<{
    body: z.ZodObject<{}, z.core.$strip>;
}, z.core.$strip>;
export declare const JobValidation: {
    createJobSchema: z.ZodObject<{
        body: z.ZodObject<{}, z.core.$strip>;
    }, z.core.$strip>;
    updateJobSchema: z.ZodObject<{
        body: z.ZodObject<{}, z.core.$strip>;
    }, z.core.$strip>;
};
//# sourceMappingURL=job.validation.d.ts.map