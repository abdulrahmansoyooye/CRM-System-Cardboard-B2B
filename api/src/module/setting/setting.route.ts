import { Router } from 'express';
import { SettingController } from './setting.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = Router();

// Public Routes
router.get('/settings', SettingController.getAll);

// Admin Routes
router.post('/admin/settings', authMiddleware(['admin', 'super_admin']), SettingController.create);
router.put('/admin/settings/:id', authMiddleware(['admin', 'super_admin']), SettingController.update);

export const SettingRoutes = router;
