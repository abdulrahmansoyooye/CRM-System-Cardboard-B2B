import { Router } from 'express';
import { JobController } from './job.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = Router();

// Public Routes
router.get('/jobs', JobController.getAll);
router.get('/jobs/:id', JobController.getById);

// Admin Routes
router.post('/admin/jobs', authMiddleware(['admin', 'super_admin']), JobController.create);
router.put('/admin/jobs/:id', authMiddleware(['admin', 'super_admin']), JobController.update);
router.delete('/admin/jobs/:id', authMiddleware(['admin', 'super_admin']), JobController.deleteDoc);

export const JobRoutes = router;
