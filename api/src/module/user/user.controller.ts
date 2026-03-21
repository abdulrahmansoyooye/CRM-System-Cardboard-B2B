import asyncHandler from "../../utils/asyncHandler";
import { createUser, deactivateUser, getUserById, getUsers, updateUser } from "./user.service"
import { NextFunction, Request, Response } from "express"

export const create = asyncHandler(async (req:Request, res:Response, next:NextFunction) =>{
    const user = await createUser(req.body)
    res.status(201).json({ success: true, message:"User created successfully",data: user });
})

export const getAll = asyncHandler(async (req:Request, res:Response, next:NextFunction) =>{
    const users = await getUsers()
    res.status(200).json({ success: true, data: users });
})

export const getById = asyncHandler(async (req:Request, res:Response, next:NextFunction) =>{
    const user = await getUserById(req.params.id as string)
    res.status(200).json({ success: true, data: user });
})

export const update = asyncHandler(async (req:Request, res:Response, next:NextFunction) =>{
    const user = await updateUser(req.params.id as string, req.body)
    res.status(200).json({ success: true, message:"User updated successfully",data: user });
})

export const deactivate = asyncHandler(async (req:Request, res:Response, next:NextFunction) =>{
    const user = await deactivateUser(req.params.id as string)
    res.status(200).json({ success: true, message:"User deactivated successfully",data: user });
})
