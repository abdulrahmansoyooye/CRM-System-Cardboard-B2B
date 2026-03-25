"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const category_controller_1 = require("./category.controller");
const validate_middleware_1 = require("../../middleware/validate.middleware");
const category_validation_1 = require("./category.validation");
const router = (0, express_1.Router)();
// Public Routes
router.get("/categories", category_controller_1.CategoryController.getAll);
router.get("/categories/:slug", category_controller_1.CategoryController.getBySlug);
// Admin Routes
router.post("/admin/categories", (0, auth_middleware_1.authMiddleware)(["super_admin", "admin"]), (0, validate_middleware_1.validateRequest)(category_validation_1.CategoryValidation.createCategorySchema), category_controller_1.CategoryController.create);
router.put("/admin/categories/:id", (0, auth_middleware_1.authMiddleware)(["super_admin", "admin"]), (0, validate_middleware_1.validateRequest)(category_validation_1.CategoryValidation.updateCategorySchema), category_controller_1.CategoryController.update);
router.delete("/admin/categories/:id", (0, auth_middleware_1.authMiddleware)(["super_admin", "admin"]), category_controller_1.CategoryController.deleteCategory);
exports.CategoryRoutes = router;
//# sourceMappingURL=category.route.js.map