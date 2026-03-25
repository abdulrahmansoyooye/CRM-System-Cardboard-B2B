import { Router } from 'express';
import { JobApplicationController } from './job_application.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = Router();

// Public Routes
router.post('/jobs/apply', JobApplicationController.create);

export const JobApplicationRoutes = router;
