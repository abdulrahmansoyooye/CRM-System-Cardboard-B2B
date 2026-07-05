import jwt, { type JwtPayload } from "jsonwebtoken";
export interface AuthTokenPayload extends JwtPayload {
    id: string;
    email: string;
    role: string;
    type?: 'access' | 'refresh';
}
export declare const generateToken: (payload: AuthTokenPayload) => string;
export declare const verifyToken: (token: string) => string | jwt.JwtPayload;
export declare const generateRefreshToken: (payload: AuthTokenPayload) => string;
export declare const verifyRefreshToken: (token: string) => string | jwt.JwtPayload;
//# sourceMappingURL=jwt.d.ts.map