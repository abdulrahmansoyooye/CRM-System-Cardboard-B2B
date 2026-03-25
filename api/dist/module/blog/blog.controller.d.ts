import { Request, Response, NextFunction } from 'express';
export declare const create: (req: Request, res: Response, next: NextFunction) => void;
export declare const getAll: (req: Request, res: Response, next: NextFunction) => void;
export declare const getBySlug: (req: Request, res: Response, next: NextFunction) => void;
export declare const update: (req: Request, res: Response, next: NextFunction) => void;
export declare const deleteDoc: (req: Request, res: Response, next: NextFunction) => void;
export declare const BlogController: {
    create: (req: Request, res: Response, next: NextFunction) => void;
    getAll: (req: Request, res: Response, next: NextFunction) => void;
    getBySlug: (req: Request, res: Response, next: NextFunction) => void;
    update: (req: Request, res: Response, next: NextFunction) => void;
    deleteDoc: (req: Request, res: Response, next: NextFunction) => void;
};
//# sourceMappingURL=blog.controller.d.ts.map