"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = require("express");
const blog_controller_1 = require("./blog.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const validate_middleware_1 = require("../../middleware/validate.middleware");
const blog_validation_1 = require("./blog.validation");
const router = (0, express_1.Router)();
// Public Routes
router.get('/blogs', blog_controller_1.BlogController.getAll);
router.get('/blogs/:slug', blog_controller_1.BlogController.getBySlug);
// Admin Routes
router.post('/admin/blogs', (0, auth_middleware_1.authMiddleware)(['admin', 'super_admin']), (0, validate_middleware_1.validateRequest)(blog_validation_1.BlogValidation.createBlogSchema), blog_controller_1.BlogController.create);
router.put('/admin/blogs/:id', (0, auth_middleware_1.authMiddleware)(['admin', 'super_admin']), (0, validate_middleware_1.validateRequest)(blog_validation_1.BlogValidation.updateBlogSchema), blog_controller_1.BlogController.update);
router.delete('/admin/blogs/:id', (0, auth_middleware_1.authMiddleware)(['admin', 'super_admin']), blog_controller_1.BlogController.deleteDoc);
exports.BlogRoutes = router;
//# sourceMappingURL=blog.route.js.map