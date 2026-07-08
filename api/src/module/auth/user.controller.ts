import sendResponse from '../../core/response/sendResponse';
import { responseCache, getCacheKey, purgeByPrefix } from '../../core/response/responseCache';
import asyncHandler from "../../utils/asyncHandler";
import { UserService } from "./user.service"
import { NextFunction, Request, Response } from "express"

const CACHE_TTL = 60;

export const create = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { user, token } = await UserService.createUser(req.body)
    purgeByPrefix('GET:/api/v1/auth/users');
    res.status(201).json({ success: true, message: "User created successfully", data: user, token });
})

export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { user, token, refreshToken } = await UserService.loginUser(req.body)
    res.status(200).json({ success: true, message: "Login successful", data: user, token, refreshToken });
})

export const refresh = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken: refreshTokenStr } = req.body;
    if (!refreshTokenStr) {
        sendResponse(res, { statusCode: 400, success: false, message: "Refresh token is required", data: null });
        return;
    }
    const result = await UserService.refreshToken(refreshTokenStr);
    res.status(200).json({ success: true, message: "Token refreshed successfully", ...result });
})

export const getAll = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const cacheKey = getCacheKey(req);
    const cached = responseCache.get(cacheKey);
    if (cached) {
        return sendResponse(res, cached as any);
    }

    const { result, meta } = await UserService.getUsers(req.query)
    responseCache.set(cacheKey, { statusCode: 200, success: true, message: 'Success', meta, data: result }, CACHE_TTL);
    sendResponse(res, { statusCode: 200, success: true, message: 'Success', meta, data: result });
})

export const getById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const cacheKey = getCacheKey(req);
    const cached = responseCache.get(cacheKey);
    if (cached) {
        return sendResponse(res, cached as any);
    }

    const id = req.params.id as string;
    const user = await UserService.getUserById(id)
    responseCache.set(cacheKey, { statusCode: 200, success: true, message: 'Success', data: user }, CACHE_TTL);
    sendResponse(res, { statusCode: 200, success: true, message: 'Success', data: user });
})

export const update = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as string;
    const user = await UserService.updateUser(id, req.body)
    purgeByPrefix('GET:/api/v1/auth/users');
    res.status(200).json({ success: true, message: "User updated successfully", data: user });
})

export const deactivate = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as string;
    const user = await UserService.deactivateUser(id)
    purgeByPrefix('GET:/api/v1/auth/users');
    res.status(200).json({ success: true, message: "User deactivated successfully", data: user });
})

export const logout = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined;
    await UserService.logoutUser(token)
    res.status(200).json({ success: true, message: "Logged out successfully" });
})

export const UserController = { create, login, refresh, logout, getAll, getById, update, deactivate }
