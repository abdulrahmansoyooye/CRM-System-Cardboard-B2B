"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRoutes = void 0;
const express_1 = require("express");
const event_controller_1 = require("./event.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Public Routes
router.get('/', event_controller_1.EventController.getAll);
router.get('/:id', event_controller_1.EventController.getById);
// Admin Routes
router.post('/admin', (0, auth_middleware_1.authMiddleware)(['admin', 'super_admin']), event_controller_1.EventController.create);
router.put('/admin/:id', (0, auth_middleware_1.authMiddleware)(['admin', 'super_admin']), event_controller_1.EventController.update);
router.delete('/admin/:id', (0, auth_middleware_1.authMiddleware)(['admin', 'super_admin']), event_controller_1.EventController.deleteDoc);
exports.EventRoutes = router;
//# sourceMappingURL=event.route.js.map