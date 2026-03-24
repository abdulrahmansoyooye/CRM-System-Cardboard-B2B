import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import logger from './utils/logger';

const PORT = config.port;

let server: Server;

async function bootstrap() {
  try {
    if (!config.database_url) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }

    await mongoose.connect(config.database_url as string);
    logger.info('📦 Database connected successfully');


    server = app.listen(PORT, () => {
      logger.info(`🚀 Server is running on port ${PORT}`);
    });
  } catch (err) {
    logger.error('❌ Failed to start server:', err);
    process.exit(1);
  }
}

bootstrap();

// Handle unhandled rejections and exceptions
process.on('unhandledRejection', (err) => {
  logger.error(`unhandledRejection is detected , shutting down ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  logger.error(`uncaughtException is detected , shutting down ...`, err);
  process.exit(1);
});
