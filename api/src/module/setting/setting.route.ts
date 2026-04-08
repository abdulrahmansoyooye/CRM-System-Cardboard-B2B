import { Router } from 'express';
import { SettingController } from './setting.controller';
import { authMiddleware } from '../../middleware/auth.middleware';
import { validateRequest } from '../../middleware/validate.middleware';
import { SettingValidation } from './setting.validation';

const router = Router();

// Public Routes
router.get('/settings', SettingController.getAll);

// Admin Routes
router.post(
  '/admin/settings',
  authMiddleware(['admin', 'super_admin']),
  validateRequest(SettingValidation.createSettingSchema),
  SettingController.create
);
router.put(
  '/admin/settings/:id',
  authMiddleware(['admin', 'super_admin']),
  validateRequest(SettingValidation.updateSettingSchema),
  SettingController.update
);

export const SettingRoutes = router;
