import { Router } from 'express';
import { EventController } from './event.controller';
import { authMiddleware } from '../../middleware/auth.middleware';
import { validateRequest } from '../../middleware/validate.middleware';
import { EventValidation } from './event.validation';

const router = Router();

// Public Routes
router.get('/events', EventController.getAll);
router.get('/events/:id', EventController.getById);

// Admin Routes
router.post(
  '/admin/events',
  authMiddleware(['admin', 'super_admin']),
  validateRequest(EventValidation.createEventSchema),
  EventController.create
);
router.put(
  '/admin/events/:id',
  authMiddleware(['admin', 'super_admin']),
  validateRequest(EventValidation.updateEventSchema),
  EventController.update
);
router.delete('/admin/events/:id', authMiddleware(['admin', 'super_admin']), EventController.deleteDoc);

export const EventRoutes = router;
