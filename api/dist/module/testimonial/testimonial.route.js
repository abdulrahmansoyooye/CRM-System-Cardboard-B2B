"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestimonialRoutes = void 0;
const express_1 = require("express");
const testimonial_controller_1 = require("./testimonial.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Public Routes
router.get('/', testimonial_controller_1.TestimonialController.getAll);
router.get('/:id', testimonial_controller_1.TestimonialController.getById);
// Admin Routes
router.post('/admin', (0, auth_middleware_1.authMiddleware)(['admin', 'super_admin']), testimonial_controller_1.TestimonialController.create);
router.put('/admin/:id', (0, auth_middleware_1.authMiddleware)(['admin', 'super_admin']), testimonial_controller_1.TestimonialController.update);
router.delete('/admin/:id', (0, auth_middleware_1.authMiddleware)(['admin', 'super_admin']), testimonial_controller_1.TestimonialController.deleteDoc);
exports.TestimonialRoutes = router;
//# sourceMappingURL=testimonial.route.js.map