import morgan, { StreamOptions } from 'morgan';

import { logger } from 'common/utils';

const stream: StreamOptions = {
  write: (message) => logger.http(message),
};

const skip = () => {
  return process.env.NODE_ENV === 'production';
};

export const loggerMorganMiddleware = morgan(
  // Message format string (default).
  ':method :url :status :res[content-length] - :response-time ms',
  { stream, skip },
);
