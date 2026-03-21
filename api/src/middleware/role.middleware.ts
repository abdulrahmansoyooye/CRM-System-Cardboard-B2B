import { AppError } from './../core/errors/AppError';
export const roleMiddleware = (roles:string[])=>{
  return (req:any,res:any,next:any)=>{
    if(!roles.includes(req.user.role)){
      return next(new AppError("Forbidden",403))
    }
    next()
  }
}