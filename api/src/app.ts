import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import xss from 'xss-clean';
import globalErrorHandler from './middleware/error.middleware';
import morganMiddleware from './middleware/morgan.middleware';
import { cacheMiddleware } from './middleware/cache.middleware';
import router from './routes';

const app: Application = express();

const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map((origin) => origin.trim())
  : ['http://localhost:3000', 'http://localhost:3001'];

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
};

// Request logging
app.use(morganMiddleware);

// Secure headers
app.use(helmet());

// Performance & security
app.use(corsOptions ? cors(corsOptions) : cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xss());

// Caching headers for public resources
app.use('/api/v1', cacheMiddleware);

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
