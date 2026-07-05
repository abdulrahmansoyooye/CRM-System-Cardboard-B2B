declare namespace Express {
  interface Request {
    requestId?: string;
    user?: {
      id: string;
      email: string;
      role: string;
    };
    file?: Express.Multer.File;
    files?: Express.Multer.File[];
  }
}
