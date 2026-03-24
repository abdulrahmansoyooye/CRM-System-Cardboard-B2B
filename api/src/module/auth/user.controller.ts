import asyncHandler from "../../utils/asyncHandler";
import { UserService } from "./user.service"
import { NextFunction, Request, Response } from "express"

export const create = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { user, token } = await UserService.createUser(req.body)
    res.status(201).json({ success: true, message: "User created successfully", data: user, token });
})

export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { user, token } = await UserService.loginUser(req.body)
    res.status(200).json({ success: true, message: "Login successful", data: user, token });
})

export const getAll = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const users = await UserService.getUsers()
    res.status(200).json({ success: true, data: users });
})

export const getById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserService.getUserById(req.params.id as string as string)
    res.status(200).json({ success: true, data: user });
})

export const update = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserService.updateUser(req.params.id as string as string, req.body)
    res.status(200).json({ success: true, message: "User updated successfully", data: user });
})

export const deactivate = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserService.deactivateUser(req.params.id as string as string)
    res.status(200).json({ success: true, message: "User deactivated successfully", data: user });
})

export const logout = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    await UserService.logoutUser()
    res.status(200).json({ success: true, message: "Logged out successfully" });
})

export const UserController = {
    create,
    login,
    logout,
    getAll,
    getById,
    update,
    deactivate
}
