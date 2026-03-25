"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobRoutes = void 0;
const express_1 = require("express");
const job_controller_1 = require("./job.controller");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const router = (0, express_1.Router)();
// Public Routes
router.get('/jobs', job_controller_1.JobController.getAll);
// Admin Routes
router.post('/admin/jobs', (0, auth_middleware_1.authMiddleware)(['admin', 'super_admin']), job_controller_1.JobController.create);
router.put('/admin/jobs/:id', (0, auth_middleware_1.authMiddleware)(['admin', 'super_admin']), job_controller_1.JobController.update);
exports.JobRoutes = router;
//# sourceMappingURL=job.route.js.map