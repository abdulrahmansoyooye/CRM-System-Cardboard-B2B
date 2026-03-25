"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const morgan_middleware_1 = __importDefault(require("./middleware/morgan.middleware"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
// Request logging
app.use(morgan_middleware_1.default);
// Secure headers
app.use((0, helmet_1.default)());
// Performance & security
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Rate limiting
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    limit: 100, // Limit each IP to 100 requests per `window`
    message: 'Too many requests from this IP, please try again after 15 minutes',
}));
// Health check
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Cardbox B2B API is running',
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