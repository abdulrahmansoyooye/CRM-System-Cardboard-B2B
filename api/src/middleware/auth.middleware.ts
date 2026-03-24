import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AppError } from '../core/errors/AppError';
import asyncHandler from '../utils/asyncHandler';
import { User } from '../module/auth/user.model';
import config from '../config';

export const authMiddleware = (requiredRoles: string[]) => {
  return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token);
    if (!token) {
      throw new AppError('Token is missing!', 401);
    }

    // Checking if the given token is valid
    let decoded;
    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string
      ) as JwtPayload;
    } catch (err) {
      throw new AppError('Invalid Token!', 401);
    }


    const { role, email, iat } = decoded;

    // Checking if the user exists
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      throw new AppError('This user is not found!', 404);
    }

    // Checking if the user is already inactive
    if (!user.isActive) {
      throw new AppError('This user is inactive!', 403);
    }
     
    if (requiredRoles.length && !requiredRoles.includes(role) && role !== 'super_admin') {
      throw new AppError('You are not authorized! to perform this action', 401);
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default authMiddleware;
