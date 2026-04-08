import { Router } from 'express';
import { IndustryController } from './industry.controller';
import { authMiddleware } from '../../middleware/auth.middleware';
import { validateRequest } from '../../middleware/validate.middleware';
import { IndustryValidation } from './industry.validation';

const router = Router();

// Public Routes
router.get('/industries', IndustryController.getAll);
router.get('/industries/:slug', IndustryController.getBySlug);

// Admin Routes
router.post(
  '/admin/industries',
  authMiddleware(['admin', 'super_admin']),
  validateRequest(IndustryValidation.createIndustrySchema),
  IndustryController.create
);
router.put(
  '/admin/industries/:id',
  authMiddleware(['admin', 'super_admin']),
  validateRequest(IndustryValidation.updateIndustrySchema),
  IndustryController.update
);
router.delete('/admin/industries/:id', authMiddleware(['admin', 'super_admin']), IndustryController.deleteDoc);

export const IndustryRoutes = router;
