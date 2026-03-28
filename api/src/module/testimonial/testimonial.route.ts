import { Router } from 'express';
import { TestimonialController } from './testimonial.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = Router();

// Public Routes
router.get('/testimonials', TestimonialController.getAll);
router.get('/testimonials/:id', TestimonialController.getById);

// Admin Routes
router.post('/admin/testimonials', authMiddleware(['admin', 'super_admin']), TestimonialController.create);
router.put('/admin/testimonials/:id', authMiddleware(['admin', 'super_admin']), TestimonialController.update);
router.delete('/admin/testimonials/:id', authMiddleware(['admin', 'super_admin']), TestimonialController.deleteDoc);

export const TestimonialRoutes = router;
