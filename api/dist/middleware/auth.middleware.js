"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const AppError_1 = require("../core/errors/AppError");
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const user_model_1 = require("../module/auth/user.model");
const jwt_1 = require("../utils/jwt");
const authMiddleware = (requiredRoles) => {
    return (0, asyncHandler_1.default)(async (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new AppError_1.AppError('Authorization token is missing', 401);
        }
        let decoded;
        try {
            decoded = (0, jwt_1.verifyToken)(token);
        }
        catch (err) {
            throw new AppError_1.AppError('Invalid authorization token', 401);
        }
        const { role, email } = decoded;
        if (!email || !role || typeof email !== 'string' || typeof role !== 'string') {
            throw new AppError_1.AppError('Invalid token payload', 401);
        }
        const user = await user_model_1.User.findOne({ email });
        if (!user) {
            throw new AppError_1.AppError('User not found', 404);
        }
        if (!user.isActive) {
            throw new AppError_1.AppError('User account is inactive', 403);
        }
        if (requiredRoles.length && !requiredRoles.includes(role) && role !== 'super_admin') {
            throw new AppError_1.AppError('You do not have permission to perform this action', 403);
        }
        req.user = decoded;
        next();
    });
};
exports.authMiddleware = authMiddleware;
exports.default = exports.authMiddleware;
//# sourceMappingURL=auth.middleware.js.map