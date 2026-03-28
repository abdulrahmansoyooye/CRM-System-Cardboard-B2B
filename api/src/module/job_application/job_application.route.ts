import { Router } from 'express';
import { JobApplicationController } from './job_application.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = Router();

// Public Routes
router.post('/jobs/apply', JobApplicationController.create);

// Admin Routes
router.get('/admin/applications', authMiddleware(['admin', 'super_admin']), JobApplicationController.getAll);
router.get('/admin/applications/:id', authMiddleware(['admin', 'super_admin']), JobApplicationController.getById);
router.put('/admin/applications/:id', authMiddleware(['admin', 'super_admin']), JobApplicationController.update);
router.delete('/admin/applications/:id', authMiddleware(['admin', 'super_admin']), JobApplicationController.deleteDoc);

export const JobApplicationRoutes = router;
