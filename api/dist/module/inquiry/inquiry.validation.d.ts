import { z } from 'zod';
export declare const createInquirySchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        company: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        email: z.ZodString;
        message: z.ZodOptional<z.ZodString>;
        productInterested: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
}, z.core.$strip>;
export declare const updateInquirySchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        company: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        message: z.ZodOptional<z.ZodString>;
        status: z.ZodOptional<z.ZodEnum<{
            new: "new";
            closed: "closed";
            contacted: "contacted";
            quoted: "quoted";
        }>>;
        notes: z.ZodOptional<z.ZodString>;
        assignedTo: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
}, z.core.$strip>;
export declare const InquiryValidation: {
    createInquirySchema: z.ZodObject<{
        body: z.ZodObject<{
            name: z.ZodString;
            company: z.ZodOptional<z.ZodString>;
            phone: z.ZodOptional<z.ZodString>;
            email: z.ZodString;
            message: z.ZodOptional<z.ZodString>;
            productInterested: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>;
    }, z.core.$strip>;
    updateInquirySchema: z.ZodObject<{
        body: z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            company: z.ZodOptional<z.ZodString>;
            phone: z.ZodOptional<z.ZodString>;
            email: z.ZodOptional<z.ZodString>;
            message: z.ZodOptional<z.ZodString>;
            status: z.ZodOptional<z.ZodEnum<{
                new: "new";
                closed: "closed";
                contacted: "contacted";
                quoted: "quoted";
            }>>;
            notes: z.ZodOptional<z.ZodString>;
            assignedTo: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>;
    }, z.core.$strip>;
};
//# sourceMappingURL=inquiry.validation.d.ts.map