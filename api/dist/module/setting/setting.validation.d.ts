import { z } from 'zod';
export declare const createSettingSchema: z.ZodObject<{
    body: z.ZodObject<{}, z.core.$strip>;
}, z.core.$strip>;
export declare const updateSettingSchema: z.ZodObject<{
    body: z.ZodObject<{}, z.core.$strip>;
}, z.core.$strip>;
export declare const SettingValidation: {
    createSettingSchema: z.ZodObject<{
        body: z.ZodObject<{}, z.core.$strip>;
    }, z.core.$strip>;
    updateSettingSchema: z.ZodObject<{
        body: z.ZodObject<{}, z.core.$strip>;
    }, z.core.$strip>;
};
//# sourceMappingURL=setting.validation.d.ts.map