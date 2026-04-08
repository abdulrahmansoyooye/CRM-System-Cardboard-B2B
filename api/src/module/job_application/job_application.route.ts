import { Router } from 'express';
import { JobApplicationController } from './job_application.controller';
import { authMiddleware } from '../../middleware/auth.middleware';
import { validateRequest } from '../../middleware/validate.middleware';
import { Job_applicationValidation } from './job_application.validation';

const router = Router();

// Public Routes
router.post(
  '/jobs/apply',
  validateRequest(Job_applicationValidation.createJob_applicationSchema),
  JobApplicationController.create
);

// Admin Routes
router.get('/admin/applications', authMiddleware(['admin', 'super_admin']), JobApplicationController.getAll);
router.get('/admin/applications/:id', authMiddleware(['admin', 'super_admin']), JobApplicationController.getById);
router.put(
  '/admin/applications/:id',
  authMiddleware(['admin', 'super_admin']),
  validateRequest(Job_applicationValidation.updateJob_applicationSchema),
  JobApplicationController.update
);
router.delete('/admin/applications/:id', authMiddleware(['admin', 'super_admin']), JobApplicationController.deleteDoc);

export const JobApplicationRoutes = router;
