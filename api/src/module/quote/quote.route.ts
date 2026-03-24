import { Router } from 'express';
import { QuoteController } from './quote.controller';
import { authMiddleware } from '../../middleware/auth.middleware';

const router = Router();

// Public Routes
router.post('/quote', QuoteController.create);

export const QuoteRoutes = router;
