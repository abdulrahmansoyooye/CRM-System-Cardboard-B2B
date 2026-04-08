import { Router } from 'express';
import { TestimonialController } from './testimonial.controller';
import { authMiddleware } from '../../middleware/auth.middleware';
import { validateRequest } from '../../middleware/validate.middleware';
import { TestimonialValidation } from './testimonial.validation';

const router = Router();

// Public Routes
router.get('/testimonials', TestimonialController.getAll);
router.get('/testimonials/:id', TestimonialController.getById);

// Admin Routes
router.post(
  '/admin/testimonials',
  authMiddleware(['admin', 'super_admin']),
  validateRequest(TestimonialValidation.createTestimonialSchema),
  TestimonialController.create
);
router.put(
  '/admin/testimonials/:id',
  authMiddleware(['admin', 'super_admin']),
  validateRequest(TestimonialValidation.updateTestimonialSchema),
  TestimonialController.update
);
router.delete('/admin/testimonials/:id', authMiddleware(['admin', 'super_admin']), TestimonialController.deleteDoc);

export const TestimonialRoutes = router;
