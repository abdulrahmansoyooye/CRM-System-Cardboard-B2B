import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
export interface AuthRequest extends Request {
    user: JwtPayload & {
        id?: string;
        role?: string;
        email?: string;
    };
}
export declare const roleMiddleware: (roles: string[]) => (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=role.middleware.d.ts.map