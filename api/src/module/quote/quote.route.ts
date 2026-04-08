import { Router } from 'express';
import { QuoteController } from './quote.controller';
import { authMiddleware } from '../../middleware/auth.middleware';
import { validateRequest } from '../../middleware/validate.middleware';
import { QuoteValidation } from './quote.validation';

const router = Router();

// Public Routes
router.post(
  '/quote',
  validateRequest(QuoteValidation.createQuoteSchema),
  QuoteController.create
);

// Admin Routes
router.get('/admin/quotes', authMiddleware(['admin', 'super_admin']), QuoteController.getAll);
router.get('/admin/quotes/:id', authMiddleware(['admin', 'super_admin']), QuoteController.getById);
router.put(
  '/admin/quotes/:id',
  authMiddleware(['admin', 'super_admin']),
  validateRequest(QuoteValidation.updateQuoteSchema),
  QuoteController.update
);
router.delete('/admin/quotes/:id', authMiddleware(['admin', 'super_admin']), QuoteController.deleteDoc);

export const QuoteRoutes = router;
