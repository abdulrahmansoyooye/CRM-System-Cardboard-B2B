import { z } from 'zod';
export declare const createJobSchema: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodString;
        department: z.ZodOptional<z.ZodString>;
        experience: z.ZodOptional<z.ZodString>;
        location: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        status: z.ZodDefault<z.ZodEnum<{
            closed: "closed";
            open: "open";
        }>>;
    }, z.core.$strict>;
}, z.core.$strip>;
export declare const updateJobSchema: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        department: z.ZodOptional<z.ZodString>;
        experience: z.ZodOptional<z.ZodString>;
        location: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        status: z.ZodOptional<z.ZodEnum<{
            closed: "closed";
            open: "open";
        }>>;
    }, z.core.$strict>;
}, z.core.$strip>;
export declare const JobValidation: {
    createJobSchema: z.ZodObject<{
        body: z.ZodObject<{
            title: z.ZodString;
            department: z.ZodOptional<z.ZodString>;
            experience: z.ZodOptional<z.ZodString>;
            location: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            status: z.ZodDefault<z.ZodEnum<{
                closed: "closed";
                open: "open";
            }>>;
        }, z.core.$strict>;
    }, z.core.$strip>;
    updateJobSchema: z.ZodObject<{
        body: z.ZodObject<{
            title: z.ZodOptional<z.ZodString>;
            department: z.ZodOptional<z.ZodString>;
            experience: z.ZodOptional<z.ZodString>;
            location: z.ZodOptional<z.ZodString>;
            description: z.ZodOptional<z.ZodString>;
            status: z.ZodOptional<z.ZodEnum<{
                closed: "closed";
                open: "open";
            }>>;
        }, z.core.$strict>;
    }, z.core.$strip>;
};
//# sourceMappingURL=job.validation.d.ts.map