"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
router.post("/login", user_controller_1.UserController.login);
router.post("/logout", user_controller_1.UserController.logout);
router.post("/create", (0, auth_middleware_1.authMiddleware)(["super_admin"]), user_controller_1.UserController.create);
router.get("/all", (0, auth_middleware_1.authMiddleware)(["super_admin", "admin"]), user_controller_1.UserController.getAll);
router.get("/:id/details", (0, auth_middleware_1.authMiddleware)(["super_admin", "admin"]), user_controller_1.UserController.getById);
router.put("/:id/update", (0, auth_middleware_1.authMiddleware)(["super_admin", "admin"]), user_controller_1.UserController.update);
router.patch("/:id/deactivate", (0, auth_middleware_1.authMiddleware)(["super_admin", "admin"]), user_controller_1.UserController.deactivate);
exports.UserRoutes = router;
//# sourceMappingURL=user.routes.js.map