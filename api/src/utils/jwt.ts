import jwt, { type JwtPayload } from "jsonwebtoken"
import env from "../config/index"

export interface AuthTokenPayload extends JwtPayload {
    id: string;
    email: string;
    role: string;
}

export const generateToken = (payload: AuthTokenPayload) => {
    return jwt.sign(payload, env.jwt_access_secret, {
        expiresIn: env.jwt_access_expires_in as jwt.SignOptions['expiresIn']
    })
}

export const verifyToken = (token:string) => {
    return jwt.verify(token,env.jwt_access_secret)
}
