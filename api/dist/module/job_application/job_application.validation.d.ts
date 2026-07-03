import { z } from 'zod';
export declare const createJob_applicationSchema: z.ZodObject<{
    body: z.ZodObject<{
        jobId: z.ZodString;
        name: z.ZodString;
        email: z.ZodString;
        phone: z.ZodOptional<z.ZodString>;
        resumeFile: z.ZodOptional<z.ZodString>;
        notes: z.ZodOptional<z.ZodString>;
        status: z.ZodDefault<z.ZodEnum<{
            new: "new";
            reviewed: "reviewed";
            shortlisted: "shortlisted";
            rejected: "rejected";
        }>>;
    }, z.core.$strict>;
}, z.core.$strip>;
export declare const updateJob_applicationSchema: z.ZodObject<{
    body: z.ZodObject<{
        jobId: z.ZodOptional<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        resumeFile: z.ZodOptional<z.ZodString>;
        status: z.ZodOptional<z.ZodEnum<{
            new: "new";
            reviewed: "reviewed";
            shortlisted: "shortlisted";
            rejected: "rejected";
        }>>;
        notes: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
}, z.core.$strip>;
export declare const Job_applicationValidation: {
    createJob_applicationSchema: z.ZodObject<{
        body: z.ZodObject<{
            jobId: z.ZodString;
            name: z.ZodString;
            email: z.ZodString;
            phone: z.ZodOptional<z.ZodString>;
            resumeFile: z.ZodOptional<z.ZodString>;
            notes: z.ZodOptional<z.ZodString>;
            status: z.ZodDefault<z.ZodEnum<{
                new: "new";
                reviewed: "reviewed";
                shortlisted: "shortlisted";
                rejected: "rejected";
            }>>;
        }, z.core.$strict>;
    }, z.core.$strip>;
    updateJob_applicationSchema: z.ZodObject<{
        body: z.ZodObject<{
            jobId: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            email: z.ZodOptional<z.ZodString>;
            phone: z.ZodOptional<z.ZodString>;
            resumeFile: z.ZodOptional<z.ZodString>;
            status: z.ZodOptional<z.ZodEnum<{
                new: "new";
                reviewed: "reviewed";
                shortlisted: "shortlisted";
                rejected: "rejected";
            }>>;
            notes: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>;
    }, z.core.$strip>;
};
//# sourceMappingURL=job_application.validation.d.ts.map