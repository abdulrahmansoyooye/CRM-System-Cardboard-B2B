"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserSchema = void 0;
const zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, 'Name must be at least 3 characters long'),
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters long'),
    role: zod_1.z.enum(['super_admin', 'admin', 'content_manager', 'hr_manager', 'sales_manager']),
}).strict();
//# sourceMappingURL=user.validation.js.map