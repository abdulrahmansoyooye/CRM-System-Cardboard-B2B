import express from 'express';
import { ProductController } from './product.controller';
import { validateRequest } from '../../middleware/validate.middleware';
import { ProductValidation } from './product.validation';
import authMiddleware from '../../middleware/auth.middleware';

const router = express.Router();

router.post(
  '/',
  authMiddleware('admin'),
  validateRequest(ProductValidation.createProductSchema),
  ProductController.create
);

router.get('/', ProductController.getAll);

router.get('/:id', ProductController.getById);

router.patch(
  '/:id',
  authMiddleware('admin'),
  validateRequest(ProductValidation.updateProductSchema),
  ProductController.update
);

router.delete('/:id', authMiddleware('admin'), ProductController.deleteProduct);

export const ProductRoutes = router;


