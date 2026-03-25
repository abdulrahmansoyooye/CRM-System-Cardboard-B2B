"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = exports.logout = exports.deactivate = exports.update = exports.getById = exports.getAll = exports.login = exports.create = void 0;
const asyncHandler_1 = __importDefault(require("../../utils/asyncHandler"));
const user_service_1 = require("./user.service");
exports.create = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { user, token } = await user_service_1.UserService.createUser(req.body);
    res.status(201).json({ success: true, message: "User created successfully", data: user, token });
});
exports.login = (0, asyncHandler_1.default)(async (req, res, next) => {
    const { user, token } = await user_service_1.UserService.loginUser(req.body);
    res.status(200).json({ success: true, message: "Login successful", data: user, token });
});
exports.getAll = (0, asyncHandler_1.default)(async (req, res, next) => {
    const users = await user_service_1.UserService.getUsers();
    res.status(200).json({ success: true, data: users });
});
exports.getById = (0, asyncHandler_1.default)(async (req, res, next) => {
    const user = await user_service_1.UserService.getUserById(req.params.id);
    res.status(200).json({ success: true, data: user });
});
exports.update = (0, asyncHandler_1.default)(async (req, res, next) => {
    const user = await user_service_1.UserService.updateUser(req.params.id, req.body);
    res.status(200).json({ success: true, message: "User updated successfully", data: user });
});
exports.deactivate = (0, asyncHandler_1.default)(async (req, res, next) => {
    const user = await user_service_1.UserService.deactivateUser(req.params.id);
    res.status(200).json({ success: true, message: "User deactivated successfully", data: user });
});
exports.logout = (0, asyncHandler_1.default)(async (req, res, next) => {
    await user_service_1.UserService.logoutUser();
    res.status(200).json({ success: true, message: "Logged out successfully" });
});
exports.UserController = {
    create: exports.create,
    login: exports.login,
    logout: exports.logout,
    getAll: exports.getAll,
    getById: exports.getById,
    update: exports.update,
    deactivate: exports.deactivate
};
//# sourceMappingURL=user.controller.js.map