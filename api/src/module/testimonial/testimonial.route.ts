import { Router } from 'express';
import { TestimonialController } from './testimonial.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = Router();

// Public Routes
router.get('/', TestimonialController.getAll);
router.get('/:id', TestimonialController.getById);

// Admin Routes
router.post('/admin', authMiddleware(['admin', 'super_admin']), TestimonialController.create);
router.put('/admin/:id', authMiddleware(['admin', 'super_admin']), TestimonialController.update);
router.delete('/admin/:id', authMiddleware(['admin', 'super_admin']), TestimonialController.deleteDoc);

export const TestimonialRoutes = router;
