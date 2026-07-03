"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InquiryRoutes = void 0;
const express_1 = require("express");
const inquiry_controller_1 = require("./inquiry.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const validate_middleware_1 = require("../../middleware/validate.middleware");
const inquiry_validation_1 = require("./inquiry.validation");
const router = (0, express_1.Router)();
// Public Routes
router.post('/contact', (0, validate_middleware_1.validateRequest)(inquiry_validation_1.InquiryValidation.createInquirySchema), inquiry_controller_1.InquiryController.create);
// Admin Routes
router.get('/admin/inquiries', (0, auth_middleware_1.authMiddleware)(['admin', 'super_admin']), inquiry_controller_1.InquiryController.getAll);
router.get('/admin/inquiries/:id', (0, auth_middleware_1.authMiddleware)(['admin', 'super_admin']), inquiry_controller_1.InquiryController.getById);
router.put('/admin/inquiries/:id', (0, auth_middleware_1.authMiddleware)(['admin', 'super_admin']), (0, validate_middleware_1.validateRequest)(inquiry_validation_1.InquiryValidation.updateInquirySchema), inquiry_controller_1.InquiryController.update);
router.delete('/admin/inquiries/:id', (0, auth_middleware_1.authMiddleware)(['admin', 'super_admin']), inquiry_controller_1.InquiryController.deleteDoc);
exports.InquiryRoutes = router;
//# sourceMappingURL=inquiry.route.js.map