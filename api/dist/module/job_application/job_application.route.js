"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobApplicationRoutes = void 0;
const express_1 = require("express");
const job_application_controller_1 = require("./job_application.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Public Routes
router.post('/jobs/apply', job_application_controller_1.JobApplicationController.create);
// Admin Routes
router.get('/admin/applications', (0, auth_middleware_1.authMiddleware)(['admin', 'super_admin']), job_application_controller_1.JobApplicationController.getAll);
router.get('/admin/applications/:id', (0, auth_middleware_1.authMiddleware)(['admin', 'super_admin']), job_application_controller_1.JobApplicationController.getById);
router.put('/admin/applications/:id', (0, auth_middleware_1.authMiddleware)(['admin', 'super_admin']), job_application_controller_1.JobApplicationController.update);
router.delete('/admin/applications/:id', (0, auth_middleware_1.authMiddleware)(['admin', 'super_admin']), job_application_controller_1.JobApplicationController.deleteDoc);
exports.JobApplicationRoutes = router;
//# sourceMappingURL=job_application.route.js.map