import { NextFunction, Request, Response } from "express";
export declare const create: (req: Request, res: Response, next: NextFunction) => void;
export declare const login: (req: Request, res: Response, next: NextFunction) => void;
export declare const refresh: (req: Request, res: Response, next: NextFunction) => void;
export declare const getAll: (req: Request, res: Response, next: NextFunction) => void;
export declare const getById: (req: Request, res: Response, next: NextFunction) => void;
export declare const update: (req: Request, res: Response, next: NextFunction) => void;
export declare const deactivate: (req: Request, res: Response, next: NextFunction) => void;
export declare const logout: (req: Request, res: Response, next: NextFunction) => void;
export declare const UserController: {
    create: (req: Request, res: Response, next: NextFunction) => void;
    login: (req: Request, res: Response, next: NextFunction) => void;
    refresh: (req: Request, res: Response, next: NextFunction) => void;
    logout: (req: Request, res: Response, next: NextFunction) => void;
    getAll: (req: Request, res: Response, next: NextFunction) => void;
    getById: (req: Request, res: Response, next: NextFunction) => void;
    update: (req: Request, res: Response, next: NextFunction) => void;
    deactivate: (req: Request, res: Response, next: NextFunction) => void;
};
//# sourceMappingURL=user.controller.d.ts.map