import winston from 'winston';
import path from 'path';

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define level based on environment
const level = () => {
  const env = process.env.NODE_ENV || 'development';
  const isDevelopment = env === 'development';
  return isDevelopment ? 'debug' : 'warn';
};

// Define colors for each level
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
};

// Tell winston that we want to link the colors
winston.addColors(colors);

// Custom format for console
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
);

// Transporters for Winston
const transports = [
  // Always log to console
  new winston.transports.Console({
    format,
  }),
  // Log errors to a separate file
  new winston.transports.File({
    filename: path.join('logs', 'error.log'),
    level: 'error',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    )
  }),
  // Log all levels to a unified file
  new winston.transports.File({ 
    filename: path.join('logs', 'all.log'),
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    )
  }),
];

// Create the logger instance
const logger = winston.createLogger({
  level: level(),
  levels,
  transports,
});

export default logger;
