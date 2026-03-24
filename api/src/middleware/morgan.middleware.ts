import morgan, { StreamOptions } from "morgan";
import logger from "../utils/logger";

// Override the stream method to tell morgan to use our winston logger instead of the console
const stream: StreamOptions = {
  // Use the http severity
  write: (message: string) => logger.http(message.trim()),
};

// Skip all the morgan logging if not in development
const skip = () => {
  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

// Build the morgan middleware
const morganMiddleware = morgan(
  // Define message format string (this is the "dev" format, check morgan docs for others)
  ":method :url :status :res[content-length] - :response-time ms",
  // Options: override stream and skip logic
  { stream, skip }
);

export default morganMiddleware;
