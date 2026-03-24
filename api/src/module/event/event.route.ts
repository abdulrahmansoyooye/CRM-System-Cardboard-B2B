import { Router } from 'express';
import { EventController } from './event.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = Router();

// Public Routes
router.get('/', EventController.getAll);
router.get('/:id', EventController.getById);

// Admin Routes
router.post('/admin', authMiddleware(['admin', 'super_admin']), EventController.create);
router.put('/admin/:id', authMiddleware(['admin', 'super_admin']), EventController.update);
router.delete('/admin/:id', authMiddleware(['admin', 'super_admin']), EventController.deleteDoc);

export const EventRoutes = router;
