import { Request, Response, NextFunction } from 'express';
import { AppError } from '../core/errors/AppError';

export const roleMiddleware = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
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
