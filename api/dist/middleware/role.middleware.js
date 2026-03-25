"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = void 0;
const AppError_1 = require("../core/errors/AppError");
const roleMiddleware = (roles) => {
    return (req, res, next) => {
        const userRole = req.user?.role;
        if (!userRole) {
            return next(new AppError_1.AppError("Unauthorized access - User context is missing.", 401));
        }
        if (!roles.includes(userRole)) {
            return next(new AppError_1.AppError("Forbidden - You do not have sufficient permissions.", 403));
        }
        next();
    };
};
exports.roleMiddleware = roleMiddleware;
//# sourceMappingURL=role.middleware.js.map