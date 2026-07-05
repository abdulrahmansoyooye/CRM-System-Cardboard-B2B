import { z } from "zod";
export declare const createUserSchema: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        email: z.ZodString;
        password: z.ZodString;
        role: z.ZodEnum<{
            super_admin: "super_admin";
            admin: "admin";
            content_manager: "content_manager";
            hr_manager: "hr_manager";
            sales_manager: "sales_manager";
        }>;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare const loginSchema: z.ZodObject<{
    body: z.ZodObject<{
        email: z.ZodString;
        password: z.ZodString;
    }, z.core.$strict>;
}, z.core.$strict>;
export declare const refreshTokenSchema: z.ZodObject<{
    body: z.ZodObject<{
        refreshToken: z.ZodString;
    }, z.core.$strict>;
}, z.core.$strict>;
//# sourceMappingURL=user.validation.d.ts.map