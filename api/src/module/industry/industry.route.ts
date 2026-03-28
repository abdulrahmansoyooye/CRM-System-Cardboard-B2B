import { Router } from 'express';
import { IndustryController } from './industry.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = Router();

// Public Routes
router.get('/industries', IndustryController.getAll);
router.get('/industries/:slug', IndustryController.getBySlug);

// Admin Routes
router.post('/admin/industries', authMiddleware(['admin', 'super_admin']), IndustryController.create);
router.put('/admin/industries/:id', authMiddleware(['admin', 'super_admin']), IndustryController.update);
router.delete('/admin/industries/:id', authMiddleware(['admin', 'super_admin']), IndustryController.deleteDoc);

export const IndustryRoutes = router;
