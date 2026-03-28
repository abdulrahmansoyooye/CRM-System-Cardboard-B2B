import { Router } from 'express';
import { InquiryController } from './inquiry.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = Router();

// Public Routes
router.post('/contact', InquiryController.create);

// Admin Routes
router.get('/admin/inquiries', authMiddleware(['admin', 'super_admin']), InquiryController.getAll);
router.get('/admin/inquiries/:id', authMiddleware(['admin', 'super_admin']), InquiryController.getById);
router.put('/admin/inquiries/:id', authMiddleware(['admin', 'super_admin']), InquiryController.update);
router.delete('/admin/inquiries/:id', authMiddleware(['admin', 'super_admin']), InquiryController.deleteDoc);

export const InquiryRoutes = router;
