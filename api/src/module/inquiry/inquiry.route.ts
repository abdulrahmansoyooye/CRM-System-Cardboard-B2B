import { Router } from 'express';
import { InquiryController } from './inquiry.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = Router();

// Public Routes
router.post('/contact', InquiryController.create);

// Admin Routes
router.get('/admin/inquiries', authMiddleware(['admin', 'super_admin']), InquiryController.getAll);
router.put('/admin/inquiries/:id', authMiddleware(['admin', 'super_admin']), InquiryController.update);

export const InquiryRoutes = router;
