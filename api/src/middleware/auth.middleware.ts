import { NextFunction, Request, Response } from 'express';
import { AppError } from '../core/errors/AppError';
import asyncHandler from '../utils/asyncHandler';
import { User } from '../module/auth/user.model';
import { AuthTokenPayload, verifyToken } from '../utils/jwt';

export const authMiddleware = (requiredRoles: string[]) => {
  return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new AppError('Authorization token is missing', 401);
    }

    let decoded: AuthTokenPayload;
    try {
      decoded = verifyToken(token) as AuthTokenPayload;
    } catch (err) {
      throw new AppError('Invalid authorization token', 401);
    }

    const { role, email } = decoded;
    if (!email || !role || typeof email !== 'string' || typeof role !== 'string') {
      throw new AppError('Invalid token payload', 401);
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (!user.isActive) {
      throw new AppError('User account is inactive', 403);
    }

    if (requiredRoles.length && !requiredRoles.includes(role) && role !== 'super_admin') {
      throw new AppError('You do not have permission to perform this action', 403);
    }

    req.user = decoded;
    next();
  });
};

export default authMiddleware;
