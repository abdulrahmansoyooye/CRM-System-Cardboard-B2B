"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUserRoutes = exports.AuthRoutes = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const validate_middleware_1 = require("../../middleware/validate.middleware");
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = (0, express_1.Router)();
router.post("/login", (0, validate_middleware_1.validateRequest)(user_validation_1.loginSchema), user_controller_1.UserController.login);
router.post("/logout", user_controller_1.UserController.logout);
router.post("/refresh-token", (0, validate_middleware_1.validateRequest)(user_validation_1.refreshTokenSchema), user_controller_1.UserController.refresh);
router.post("/create", (0, auth_middleware_1.authMiddleware)(["super_admin", "admin"]), (0, validate_middleware_1.validateRequest)(user_validation_1.createUserSchema), user_controller_1.UserController.create);
router.get("/all", (0, auth_middleware_1.authMiddleware)(["super_admin", "admin"]), user_controller_1.UserController.getAll);
router.get("/:id/details", (0, auth_middleware_1.authMiddleware)(["super_admin", "admin"]), user_controller_1.UserController.getById);
router.put("/:id/update", (0, auth_middleware_1.authMiddleware)(["super_admin", "admin"]), user_controller_1.UserController.update);
router.patch("/:id/deactivate", (0, auth_middleware_1.authMiddleware)(["super_admin", "admin"]), user_controller_1.UserController.deactivate);
exports.AuthRoutes = router;
// Admin-friendly routes matching /admin/users pattern used by other modules.
// The admin frontend calls these endpoints instead of /auth/*.
const adminRouter = (0, express_1.Router)();
adminRouter.get("/admin/users", (0, auth_middleware_1.authMiddleware)(["super_admin", "admin"]), user_controller_1.UserController.getAll);
adminRouter.post("/admin/users", (0, auth_middleware_1.authMiddleware)(["super_admin", "admin"]), (0, validate_middleware_1.validateRequest)(user_validation_1.createUserSchema), user_controller_1.UserController.create);
adminRouter.put("/admin/users/:id", (0, auth_middleware_1.authMiddleware)(["super_admin", "admin"]), user_controller_1.UserController.update);
adminRouter.delete("/admin/users/:id", (0, auth_middleware_1.authMiddleware)(["super_admin", "admin"]), user_controller_1.UserController.deactivate);
exports.AdminUserRoutes = adminRouter;
//# sourceMappingURL=user.routes.js.map