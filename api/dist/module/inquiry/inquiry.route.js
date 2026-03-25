"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InquiryRoutes = void 0;
const express_1 = require("express");
const inquiry_controller_1 = require("./inquiry.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Public Routes
router.post('/contact', inquiry_controller_1.InquiryController.create);
// Admin Routes
router.get('/admin/inquiries', (0, auth_middleware_1.authMiddleware)(['admin', 'super_admin']), inquiry_controller_1.InquiryController.getAll);
router.put('/admin/inquiries/:id', (0, auth_middleware_1.authMiddleware)(['admin', 'super_admin']), inquiry_controller_1.InquiryController.update);
exports.InquiryRoutes = router;
//# sourceMappingURL=inquiry.route.js.map