
import { AppError } from "../../core/errors/AppError";
import { generateToken } from "../../utils/jwt";
import { User } from "./user.model";

export const createUser = async (data:any) =>{
    const exists = await User.findOne({email: data.email})
    if(exists){
        throw new AppError('User already exists', 400)
    }
    
    const user = await User.create(data)
    const token  = generateToken({id: user._id,email:user.email, role:user.role})
    return {user,token} 
}

export const loginUser = async (payload: any) => {
    const user = await User.findOne({ email: payload.email }).select('+password');
    if (!user) {
        throw new AppError('Incorrect email or password', 401);
    }

    const isMatched = await (user as any).isPasswordMatched(payload.password);
    if (!isMatched) {
        throw new AppError('Incorrect email or password', 401);
    }

    if (!user.isActive) {
        throw new AppError('This user is inactive!', 403);
    }

    const token = generateToken({ id: user._id, email: user.email, role: user.role });
    
    // Remote password from the user object for the response
    const userObj = user.toObject();
    delete (userObj as any).password;

    return { user: userObj, token };
}

export const UserService = {
    createUser,
    loginUser,
}