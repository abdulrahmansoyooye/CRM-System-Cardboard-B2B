import { z } from 'zod';
export declare const createQuoteSchema: z.ZodObject<{
    body: z.ZodObject<{}, z.core.$strip>;
}, z.core.$strip>;
export declare const updateQuoteSchema: z.ZodObject<{
    body: z.ZodObject<{}, z.core.$strip>;
}, z.core.$strip>;
export declare const QuoteValidation: {
    createQuoteSchema: z.ZodObject<{
        body: z.ZodObject<{}, z.core.$strip>;
    }, z.core.$strip>;
    updateQuoteSchema: z.ZodObject<{
        body: z.ZodObject<{}, z.core.$strip>;
    }, z.core.$strip>;
};
//# sourceMappingURL=quote.validation.d.ts.map