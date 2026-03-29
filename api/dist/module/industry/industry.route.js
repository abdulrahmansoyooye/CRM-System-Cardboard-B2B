"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndustryRoutes = void 0;
const express_1 = require("express");
const industry_controller_1 = require("./industry.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Public Routes
router.get('/industries', industry_controller_1.IndustryController.getAll);
router.get('/industries/:slug', industry_controller_1.IndustryController.getBySlug);
// Admin Routes
router.post('/admin/industries', (0, auth_middleware_1.authMiddleware)(['admin', 'super_admin']), industry_controller_1.IndustryController.create);
router.put('/admin/industries/:id', (0, auth_middleware_1.authMiddleware)(['admin', 'super_admin']), industry_controller_1.IndustryController.update);
router.delete('/admin/industries/:id', (0, auth_middleware_1.authMiddleware)(['admin', 'super_admin']), industry_controller_1.IndustryController.deleteDoc);
exports.IndustryRoutes = router;
//# sourceMappingURL=industry.route.js.map