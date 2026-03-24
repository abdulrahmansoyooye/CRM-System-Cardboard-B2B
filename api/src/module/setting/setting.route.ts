import { Router } from 'express';
import { SettingController } from './setting.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = Router();

// Public Routes
router.get('/settings', SettingController.getAll);

// Admin Routes
router.put('/admin/settings', authMiddleware(['admin', 'super_admin']), SettingController.update);

export const SettingRoutes = router;
