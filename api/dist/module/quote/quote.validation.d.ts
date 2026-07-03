import { z } from 'zod';
export declare const createQuoteSchema: z.ZodObject<{
    body: z.ZodObject<{
        productId: z.ZodOptional<z.ZodString>;
        quantity: z.ZodOptional<z.ZodNumber>;
        customizationDetails: z.ZodOptional<z.ZodString>;
        deliveryLocation: z.ZodOptional<z.ZodString>;
        name: z.ZodString;
        phone: z.ZodOptional<z.ZodString>;
        email: z.ZodString;
        notes: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
}, z.core.$strip>;
export declare const updateQuoteSchema: z.ZodObject<{
    body: z.ZodObject<{
        productId: z.ZodOptional<z.ZodString>;
        quantity: z.ZodOptional<z.ZodNumber>;
        customizationDetails: z.ZodOptional<z.ZodString>;
        deliveryLocation: z.ZodOptional<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        phone: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        status: z.ZodOptional<z.ZodString>;
        notes: z.ZodOptional<z.ZodString>;
    }, z.core.$strict>;
}, z.core.$strip>;
export declare const QuoteValidation: {
    createQuoteSchema: z.ZodObject<{
        body: z.ZodObject<{
            productId: z.ZodOptional<z.ZodString>;
            quantity: z.ZodOptional<z.ZodNumber>;
            customizationDetails: z.ZodOptional<z.ZodString>;
            deliveryLocation: z.ZodOptional<z.ZodString>;
            name: z.ZodString;
            phone: z.ZodOptional<z.ZodString>;
            email: z.ZodString;
            notes: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>;
    }, z.core.$strip>;
    updateQuoteSchema: z.ZodObject<{
        body: z.ZodObject<{
            productId: z.ZodOptional<z.ZodString>;
            quantity: z.ZodOptional<z.ZodNumber>;
            customizationDetails: z.ZodOptional<z.ZodString>;
            deliveryLocation: z.ZodOptional<z.ZodString>;
            name: z.ZodOptional<z.ZodString>;
            phone: z.ZodOptional<z.ZodString>;
            email: z.ZodOptional<z.ZodString>;
            status: z.ZodOptional<z.ZodString>;
            notes: z.ZodOptional<z.ZodString>;
        }, z.core.$strict>;
    }, z.core.$strip>;
};
//# sourceMappingURL=quote.validation.d.ts.map