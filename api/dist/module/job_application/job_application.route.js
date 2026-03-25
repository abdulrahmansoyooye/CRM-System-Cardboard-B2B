"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobApplicationRoutes = void 0;
const express_1 = require("express");
const job_application_controller_1 = require("./job_application.controller");
const router = (0, express_1.Router)();
// Public Routes
router.post('/jobs/apply', job_application_controller_1.JobApplicationController.create);
exports.JobApplicationRoutes = router;
//# sourceMappingURL=job_application.route.js.map