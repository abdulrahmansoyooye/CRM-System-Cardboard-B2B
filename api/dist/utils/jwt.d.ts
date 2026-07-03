import jwt, { type JwtPayload } from "jsonwebtoken";
export interface AuthTokenPayload extends JwtPayload {
    id: string;
    email: string;
    role: string;
}
export declare const generateToken: (payload: AuthTokenPayload) => string;
export declare const verifyToken: (token: string) => string | jwt.JwtPayload;
//# sourceMappingURL=jwt.d.ts.map