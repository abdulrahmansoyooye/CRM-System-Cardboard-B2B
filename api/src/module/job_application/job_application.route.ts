import { Router } from 'express';
import { Job_applicationController } from './job_application.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = Router();

// Public Routes
router.post('/jobs/apply', Job_applicationController.create);

export const Job_applicationRoutes = router;
