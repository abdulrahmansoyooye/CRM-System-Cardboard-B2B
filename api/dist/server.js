"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importDefault(require("./config"));
const logger_1 = __importDefault(require("./utils/logger"));
const PORT = config_1.default.port;
let server;
async function bootstrap() {
    try {
        if (!config_1.default.database_url) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }
        await mongoose_1.default.connect(config_1.default.database_url);
        logger_1.default.info('📦 Database connected successfully');
        server = app_1.default.listen(PORT, () => {
            logger_1.default.info(`🚀 Server is running on port ${PORT}`);
        });
    }
    catch (err) {
        logger_1.default.error('❌ Failed to start server:', err);
        process.exit(1);
    }
}
bootstrap();
// Handle unhandled rejections and exceptions
process.on('unhandledRejection', (err) => {
    logger_1.default.error(`unhandledRejection is detected , shutting down ...`, err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on('uncaughtException', (err) => {
    logger_1.default.error(`uncaughtException is detected , shutting down ...`, err);
    process.exit(1);
});
//# sourceMappingURL=server.js.map