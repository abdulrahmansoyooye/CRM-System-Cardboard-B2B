"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestimonialRoutes = void 0;
const express_1 = require("express");
const testimonial_controller_1 = require("./testimonial.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const validate_middleware_1 = require("../../middleware/validate.middleware");
const testimonial_validation_1 = require("./testimonial.validation");
const router = (0, express_1.Router)();
// Public Routes
router.get('/testimonials', testimonial_controller_1.TestimonialController.getAll);
router.get('/testimonials/:id', testimonial_controller_1.TestimonialController.getById);
// Admin Routes
router.post('/admin/testimonials', (0, auth_middleware_1.authMiddleware)(['admin', 'super_admin']), (0, validate_middleware_1.validateRequest)(testimonial_validation_1.TestimonialValidation.createTestimonialSchema), testimonial_controller_1.TestimonialController.create);
router.put('/admin/testimonials/:id', (0, auth_middleware_1.authMiddleware)(['admin', 'super_admin']), (0, validate_middleware_1.validateRequest)(testimonial_validation_1.TestimonialValidation.updateTestimonialSchema), testimonial_controller_1.TestimonialController.update);
router.delete('/admin/testimonials/:id', (0, auth_middleware_1.authMiddleware)(['admin', 'super_admin']), testimonial_controller_1.TestimonialController.deleteDoc);
exports.TestimonialRoutes = router;
//# sourceMappingURL=testimonial.route.js.map