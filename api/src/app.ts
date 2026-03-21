import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import globalErrorHandler from './middleware/error.middleware';
import router from './routes';

const app: Application = express();

// Secure headers
app.use(helmet());

// Performance & security
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100, // Limit each IP to 100 requests per `window`
    message: 'Too many requests from this IP, please try again after 15 minutes',
  })
);

// Health check
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Cardbox B2B API is running',
  });
});

// API Routes
app.use('/api/v1', router);

// Global Error Handler
app.use(globalErrorHandler);

// Handle Not Found
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'API route not found',
    errorSources: [
      {
        path: req.originalUrl,
        message: 'API route not found',
      },
    ],
  });
});

export default app;