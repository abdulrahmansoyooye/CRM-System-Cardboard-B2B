"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRoutes = void 0;
const express_1 = require("express");
const event_controller_1 = require("./event.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const validate_middleware_1 = require("../../middleware/validate.middleware");
const event_validation_1 = require("./event.validation");
const router = (0, express_1.Router)();
// Public Routes
router.get('/events', event_controller_1.EventController.getAll);
router.get('/events/:id', event_controller_1.EventController.getById);
// Admin Routes
router.post('/admin/events', (0, auth_middleware_1.authMiddleware)(['admin', 'super_admin']), (0, validate_middleware_1.validateRequest)(event_validation_1.EventValidation.createEventSchema), event_controller_1.EventController.create);
router.put('/admin/events/:id', (0, auth_middleware_1.authMiddleware)(['admin', 'super_admin']), (0, validate_middleware_1.validateRequest)(event_validation_1.EventValidation.updateEventSchema), event_controller_1.EventController.update);
router.delete('/admin/events/:id', (0, auth_middleware_1.authMiddleware)(['admin', 'super_admin']), event_controller_1.EventController.deleteDoc);
exports.EventRoutes = router;
//# sourceMappingURL=event.route.js.map