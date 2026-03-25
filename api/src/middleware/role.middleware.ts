import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { AppError } from '../core/errors/AppError';

export interface AuthRequest extends Request {
  user: JwtPayload & {
    id?: string;
    role?: string;
    email?: string;
  };
}

export const roleMiddleware = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!userRole) {
      return next(new AppError("Unauthorized access - User context is missing.", 401));
    }

    if (!roles.includes(userRole)) {
      return next(new AppError("Forbidden - You do not have sufficient permissions.", 403));
    }



    next();
  };
};