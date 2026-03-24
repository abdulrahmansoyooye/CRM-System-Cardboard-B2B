import { Router } from 'express';
import { BlogController } from './blog.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = Router();

// Public Routes
router.get('/blogs', BlogController.getAll);
router.get('/blogs/:slug', BlogController.getBySlug);

// Admin Routes
router.post('/admin/blogs', authMiddleware(['admin', 'super_admin']), BlogController.create);
router.put('/admin/blogs/:id', authMiddleware(['admin', 'super_admin']), BlogController.update);
router.delete('/admin/blogs/:id', authMiddleware(['admin', 'super_admin']), BlogController.deleteDoc);

export const BlogRoutes = router;
