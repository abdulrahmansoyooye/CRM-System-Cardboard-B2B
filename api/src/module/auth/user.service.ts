
import { AppError } from "../../core/errors/AppError";
import { generateToken } from "../../utils/jwt";
import { CreateUserDTO, LoginPayloadDTO, UpdateUserDTO } from "../../types/dtos";
import { User } from "./user.model";

export const createUser = async (data: CreateUserDTO) =>{
    const exists = await User.findOne({email: data.email})
    if(exists){
        throw new AppError('User already exists', 400)
    }
    
    const user = await User.create(data)
    const token  = generateToken({id: user._id.toString(), email:user.email, role:user.role})
    return {user,token} 
}

export const loginUser = async (payload: LoginPayloadDTO) => {
    const user = await User.findOne({ email: payload.email }).select('+password');
    if (!user) {
        throw new AppError('Email Not Found', 401);
    }

    const isMatched = await (user as typeof user & {
        isPasswordMatched: (plainPassword: string) => Promise<boolean>;
    }).isPasswordMatched(payload.password);
    if (!isMatched) {
        throw new AppError('Incorrect Password', 401);
    }

    if (!user.isActive) {
        throw new AppError('This user is inactive!', 403);
    }

    await User.findByIdAndUpdate(user._id, { lastLogin: new Date() }, { new: true });

    const token = generateToken({ id: user._id.toString(), email: user.email, role: user.role });
    
    // Remote password from the user object for the response
    const userObj = user.toObject() as Record<string, unknown>;
    delete userObj.password;

    return { user: userObj, token };
}

export const getUsers = async () => {
    const users = await User.find().select('-password')
    return users
}

export const getUserById = async (id: string) => {
    const user = await User.findById(id).select('-password')
    if (!user) {
        throw new AppError('User not found', 404)
    }
    return user
}

export const updateUser = async (id: string, data: UpdateUserDTO) => {
    const user = await User.findByIdAndUpdate(id, data, { new: true, runValidators: true }).select('-password')
    if (!user) {
        throw new AppError('User not found', 404)
    }
    return user
}

export const deactivateUser = async (id: string) => {
    const user = await User.findByIdAndUpdate(id, { isActive: false }, { new: true, runValidators: true }).select('-password')
    if (!user) {
        throw new AppError('User not found', 404)
    }
    return user
}

export const logoutUser = async () => {
    return { success: true };
}

export const UserService = {
    createUser,
    loginUser,
    getUsers,
    getUserById,
    updateUser,
    deactivateUser,
    logoutUser
}
