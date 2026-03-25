import { NextFunction, Request, Response } from 'express';
export declare const authMiddleware: (requiredRoles: string[]) => (req: Request, res: Response, next: NextFunction) => void;
export default authMiddleware;
//# sourceMappingURL=auth.middleware.d.ts.map