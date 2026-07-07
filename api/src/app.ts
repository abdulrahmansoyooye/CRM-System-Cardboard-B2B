import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import MongoStore from 'rate-limit-mongo';
import mongoose from 'mongoose';
import globalErrorHandler from './middleware/error.middleware';
import morganMiddleware from './middleware/morgan.middleware';
import { cacheMiddleware } from './middleware/cache.middleware';
import { requestIdMiddleware } from './middleware/requestId.middleware';
import { generateCsrfToken } from './middleware/csrf.middleware';
import router from './routes';
import config from './config';

const app: Application = express();
app.set('trust proxy', 1);

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

// Request ID for tracing
app.use(requestIdMiddleware);

// Request logging
app.use(morganMiddleware);

// Secure headers & compression
app.use(helmet());
app.use(compression());

// Performance & security
app.use(corsOptions ? cors(corsOptions) : cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// Caching headers for public resources
app.use('/api/v1', cacheMiddleware);

// Distributed rate limiting using MongoDB store
const rateLimitStore = new MongoStore({
  uri: config.database_url,
  collectionName: 'rateLimits',
  expireTimeMs: 15 * 60 * 1000,
  errorHandler: (err: Error) => {
    console.error('Rate limit store error:', err);
  },
});

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again after 15 minutes',
  store: rateLimitStore,
});

app.use(globalLimiter);

// Stricter rate limit for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many authentication attempts, please try again after 15 minutes',
  store: rateLimitStore,
});

app.use('/api/v1/auth', authLimiter);

// Health check
app.get('/', (req: Request, res: Response) => {
  const dbState = mongoose.connection.readyState;
  const dbLabels: Record<number, string> = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
  const dbStatus = dbLabels[dbState] || 'unknown';
  const healthy = dbState === 1;


  res.status(healthy ? 200 : 503).json({
    success: healthy,
    message: healthy ? 'Cardbox B2B API is running' : 'API is degraded',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    requestId: req.requestId,
    checks: {
      database: dbStatus,
      server: 'healthy',
    },
  });
});



// CSRF token endpoint (for frontends that opt-in to CSRF protection)
app.get('/api/v1/csrf-token', (req: Request, res: Response) => {
  const token = generateCsrfToken(req, res);
  res.json({ csrfToken: token });
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
