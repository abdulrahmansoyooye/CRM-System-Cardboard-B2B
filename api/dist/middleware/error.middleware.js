"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const AppError_1 = require("../core/errors/AppError");
const logger_1 = __importDefault(require("../utils/logger"));
const globalErrorHandler = (err, req, res, next) => {
    // Log the error
    logger_1.default.error(`${err.message} - ${req.method} ${req.originalUrl} - ${req.ip}`, {
        stack: err?.stack,
    });
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';
    let errorSources = [
        {
            path: '',
            message: 'Something went wrong',
        },
    ];
    if (err instanceof zod_1.ZodError) {
        statusCode = 400;
        message = 'Validation Error';
        errorSources = err.issues.map((issue) => ({
            path: issue?.path[issue.path.length - 1],
            message: issue.message,
        }));
    }
    else if (err?.name === 'ValidationError') {
        statusCode = 400;
        message = 'Mongoose Validation Error';
        errorSources = Object.values(err.errors).map((val) => ({
            path: val?.path,
            message: val?.message,
        }));
    }
    else if (err?.code === 11000) {
        statusCode = 400;
        message = 'Duplicate Key Error';
        const match = err.message.match(/"([^"]*)"/);
        const extractedMessage = match && match[1];
        errorSources = [
            {
                path: '',
                message: `${extractedMessage} already exists`,
            },
        ];
    }
    else if (err instanceof AppError_1.AppError) {
        statusCode = err?.statusCode;
        message = err.message;
        errorSources = [
            {
                path: '',
                message: err?.message,
            },
        ];
    }
    else if (err instanceof Error) {
        message = err.message;
        errorSources = [
            {
                path: '',
                message: err?.message,
            },
        ];
    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: process.env.NODE_ENV === 'development' ? err?.stack : null,
    });
};
exports.default = globalErrorHandler;
//# sourceMappingURL=error.middleware.js.map