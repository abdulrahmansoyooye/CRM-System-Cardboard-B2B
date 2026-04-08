import express from 'express';
import { ProductController } from './product.controller';
import { validateRequest } from '../../middleware/validate.middleware';
import { ProductValidation } from './product.validation';
import authMiddleware from '../../middleware/auth.middleware';

const router = express.Router();

router.post(
  '/admin/products',
  authMiddleware(['admin']),
  validateRequest(ProductValidation.createProductSchema),
  ProductController.create
);

router.get('/products', ProductController.getAll);
router.get('/products/:slug', ProductController.getBySlug);

router.put(
  '/admin/products/:id',
  authMiddleware(['admin']),
  validateRequest(ProductValidation.updateProductSchema),
  ProductController.update
);

router.delete('/admin/products/:id', authMiddleware(['admin']), ProductController.deleteProduct);

export const ProductRoutes = router;


