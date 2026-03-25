"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = require("../core/errors/AppError");
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const user_model_1 = require("../module/auth/user.model");
const config_1 = __importDefault(require("../config"));
const authMiddleware = (requiredRoles) => {
    return (0, asyncHandler_1.default)(async (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        console.log(token);
        if (!token) {
            throw new AppError_1.AppError('Token is missing!', 401);
        }
        // Checking if the given token is valid
        let decoded;
        try {
            decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
        }
        catch (err) {
            throw new AppError_1.AppError('Invalid Token!', 401);
        }
        const { role, email, iat } = decoded;
        // Checking if the user exists
        const user = await user_model_1.User.findOne({ email }).select('+password');
        if (!user) {
            throw new AppError_1.AppError('This user is not found!', 404);
        }
        // Checking if the user is already inactive
        if (!user.isActive) {
            throw new AppError_1.AppError('This user is inactive!', 403);
        }
        if (requiredRoles.length && !requiredRoles.includes(role) && role !== 'super_admin') {
            throw new AppError_1.AppError('You are not authorized! to perform this action', 401);
        }
        req.user = decoded;
        next();
    });
};
exports.authMiddleware = authMiddleware;
exports.default = exports.authMiddleware;
//# sourceMappingURL=auth.middleware.js.map