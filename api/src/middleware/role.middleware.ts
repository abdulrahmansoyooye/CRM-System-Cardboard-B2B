import { Request, Response, NextFunction } from 'express';
import { AppError } from '../core/errors/AppError';

export interface AuthRequest extends Request {
  user?: {
    id?: string;
    role?: string;
    email?: string;
    [key: string]: any;
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