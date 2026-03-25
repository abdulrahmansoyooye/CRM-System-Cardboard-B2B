"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = __importDefault(require("../utils/logger"));
// Override the stream method to tell morgan to use our winston logger instead of the console
const stream = {
    // Use the http severity
    write: (message) => logger_1.default.http(message.trim()),
};
// Skip all the morgan logging if not in development
const skip = () => {
    const env = process.env.NODE_ENV || "development";
    return env !== "development";
};
// Build the morgan middleware
const morganMiddleware = (0, morgan_1.default)(
// Define message format string (this is the "dev" format, check morgan docs for others)
":method :url :status :res[content-length] - :response-time ms", 
// Options: override stream and skip logic
{ stream, skip });
exports.default = morganMiddleware;
//# sourceMappingURL=morgan.middleware.js.map