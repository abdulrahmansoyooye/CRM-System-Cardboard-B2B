
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

export const getUsers =  async () =>{
    const users = await User.find().select('-password')
    return users
}

export const getUserById = async (id:string) =>{
    const user = await User.findById(id).select('-password')
    if(!user){
        throw new AppError('User not found', 404)
    }
    return user
}

export const updateUser = async (id:string, data:any) =>{
    const user = await User.findByIdAndUpdate(id, data, {new: true, runValidators: true}).select('-password')
    if(!user){
        throw new AppError('User not found', 404)
    }
    return user
}

export const deactivateUser = async (id:string) =>{
    const user = await User.findByIdAndUpdate(id, {isActive: false}, {new: true, runValidators: true}).select('-password')
    if(!user){
        throw new AppError('User not found', 404)
    }
    return user
}