
import {z} from "zod"

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(3, 'Name must be at least 3 characters long'),
    email: z.string().email('Invalid email address'),
    isActive:z.boolean(),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    role: z.enum(['super_admin', 'admin', 'content_manager', 'hr_manager', 'sales_manager']),
  }).strict(),
});


export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
  }).strict(),
});

export const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(1, 'Refresh token is required'),
  }).strict(),
}); 