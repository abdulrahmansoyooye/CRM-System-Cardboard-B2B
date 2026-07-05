"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = exports.logout = exports.deactivate = exports.update = exports.getById = exports.getAll = exports.refresh = exports.login = exports.create = void 0;
const sendResponse_1 = __importDefault(require("../../core/response/sendResponse"));
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const user_service_1 = require("./user.service");
exports.create = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { user, token } = await user_service_1.UserService.createUser(req.body);
    res.status(201).json({ success: true, message: "User created successfully", data: user, token });
});
exports.login = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { user, token, refreshToken } = await user_service_1.UserService.loginUser(req.body);
    res.status(200).json({ success: true, message: "Login successful", data: user, token, refreshToken });
});
exports.refresh = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { refreshToken: refreshTokenStr } = req.body;
    if (!refreshTokenStr) {
        (0, sendResponse_1.default)(res, { statusCode: 400, success: false, message: "Refresh token is required", data: null });
        return;
    }
    const result = await user_service_1.UserService.refreshToken(refreshTokenStr);
    res.status(200).json({ success: true, message: "Token refreshed successfully", ...result });
});
exports.getAll = (0, asyncHandler_1.default)(async (req, res, next) => {
    const users = await user_service_1.UserService.getUsers();
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: 'Success', data: users });
});
exports.getById = (0, asyncHandler_1.default)(async (req, res, next) => {
    const id = req.params.id;
    const user = await user_service_1.UserService.getUserById(id);
    (0, sendResponse_1.default)(res, { statusCode: 200, success: true, message: 'Success', data: user });
});
exports.update = (0, asyncHandler_1.default)(async (req, res, next) => {
    const id = req.params.id;
    const user = await user_service_1.UserService.updateUser(id, req.body);
    res.status(200).json({ success: true, message: "User updated successfully", data: user });
});
exports.deactivate = (0, asyncHandler_1.default)(async (req, res, next) => {
    const id = req.params.id;
    const user = await user_service_1.UserService.deactivateUser(id);
    res.status(200).json({ success: true, message: "User deactivated successfully", data: user });
});
exports.logout = (0, asyncHandler_1.default)(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : undefined;
    await user_service_1.UserService.logoutUser(token);
    res.status(200).json({ success: true, message: "Logged out successfully" });
});
exports.UserController = { create: exports.create, login: exports.login, refresh: exports.refresh, logout: exports.logout, getAll: exports.getAll, getById: exports.getById, update: exports.update, deactivate: exports.deactivate };
//# sourceMappingURL=user.controller.js.map