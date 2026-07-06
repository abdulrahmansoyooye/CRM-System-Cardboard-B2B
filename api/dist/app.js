"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const rate_limit_mongo_1 = __importDefault(require("rate-limit-mongo"));
const mongoose_1 = __importDefault(require("mongoose"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const morgan_middleware_1 = __importDefault(require("./middleware/morgan.middleware"));
const cache_middleware_1 = require("./middleware/cache.middleware");
const requestId_middleware_1 = require("./middleware/requestId.middleware");
const routes_1 = __importDefault(require("./routes"));
const config_1 = __importDefault(require("./config"));
const app = (0, express_1.default)();
const allowedOrigins = process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(',').map((origin) => origin.trim())
    : ['http://localhost:3000', 'http://localhost:3001'];
const corsOptions = {
    origin: (origin, callback) => {
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
app.use(requestId_middleware_1.requestIdMiddleware);
// Request logging
app.use(morgan_middleware_1.default);
// Secure headers
app.use((0, helmet_1.default)());
// Performance & security
app.use(corsOptions ? (0, cors_1.default)(corsOptions) : (0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Serve uploaded files statically
app.use('/uploads', express_1.default.static('uploads'));
// Caching headers for public resources
app.use('/api/v1', cache_middleware_1.cacheMiddleware);
// Distributed rate limiting using MongoDB store
const rateLimitStore = new rate_limit_mongo_1.default({
    uri: config_1.default.database_url,
    collectionName: 'rateLimits',
    expireTimeMs: 15 * 60 * 1000,
    errorHandler: (err) => {
        console.error('Rate limit store error:', err);
    },
});
const globalLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again after 15 minutes',
    store: rateLimitStore,
});
app.use(globalLimiter);
// Stricter rate limit for auth routes
const authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many authentication attempts, please try again after 15 minutes',
    store: rateLimitStore,
});
app.use('/api/v1/auth', authLimiter);
// Health check
app.get('/', (req, res) => {
    const dbState = mongoose_1.default.connection.readyState;
    const dbLabels = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
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
// API Routes
app.use('/api/v1', routes_1.default);
// Global Error Handler
app.use(error_middleware_1.default);
// Handle Not Found
app.use((req, res) => {
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
exports.default = app;
//# sourceMappingURL=app.js.map