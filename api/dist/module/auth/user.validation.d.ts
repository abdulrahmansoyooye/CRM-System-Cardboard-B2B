import { z } from "zod";
export declare const createUserSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
    role: z.ZodEnum<{
        super_admin: "super_admin";
        admin: "admin";
        content_manager: "content_manager";
        hr_manager: "hr_manager";
        sales_manager: "sales_manager";
    }>;
}, z.core.$strip>;
//# sourceMappingURL=user.validation.d.ts.map