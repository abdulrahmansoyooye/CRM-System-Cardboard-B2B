import { Router } from 'express';
import { AssetController } from './asset.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = Router();

// Public Routes
router.get('/assets', AssetController.getAll);

// Admin Routes
router.post('/admin/assets', authMiddleware(['admin', 'super_admin']), AssetController.create);
router.delete('/admin/assets/:id', authMiddleware(['admin', 'super_admin']), AssetController.deleteDoc);

export const AssetRoutes = router;
