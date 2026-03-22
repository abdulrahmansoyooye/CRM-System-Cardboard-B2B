import jwt from "jsonwebtoken"
import env from "../config/index"

export const generateToken = (payload:any) => {
    return jwt.sign(payload,env.jwt_access_secret,{expiresIn:"7d"})
}

export const verifyToken = (token:string) => {
    return jwt.verify(token,env.jwt_access_secret)
}