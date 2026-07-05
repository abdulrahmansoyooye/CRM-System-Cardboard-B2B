import { Router } from 'express';
import { AssetController } from './asset.controller';
import { authMiddleware } from '../../middleware/auth.middleware';
import { validateRequest } from '../../middleware/validate.middleware';
import { uploadSingle } from '../../middleware/upload.middleware';
import { createAssetSchema } from './asset.validation';

const router = Router();

// Public Routes
router.get('/assets', AssetController.getAll);

// Admin Routes
router.post('/admin/assets', authMiddleware(['admin', 'super_admin']), uploadSingle, validateRequest(createAssetSchema), AssetController.create);
router.delete('/admin/assets/:id', authMiddleware(['admin', 'super_admin']), AssetController.deleteDoc);

export const AssetRoutes = router;
