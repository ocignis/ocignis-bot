import http from 'http';
import https from 'https';

import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import express from 'express';
import serveIndex from 'serve-index';

import { logger } from 'common/utils';

import { loggerMorganMiddleware } from './common/loggerMorganMiddleware';
import { outgoingRequestLogger } from './common/outgoingRequestLogger';
import { customResponseError } from './rest-api/common/response/customResponseError';
import { router } from './rest-api/router';
import { createContext } from './trpc';
import { appRouter } from './trpc/router';

import './rest-api/common/response/customResponse';

// eslint-disable-next-line @typescript-eslint/require-await
export const initWebServer = async () => {
  if (process.env.NODE_ENV !== 'production') {
    outgoingRequestLogger(http);
    outgoingRequestLogger(https);
  }

  const app = express();

  app.use(cors());

  app.use(loggerMorganMiddleware);

  // ////////////////////////
  // tRPC
  // ////////////////////////
  app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    }),
  );
  // ////////////////////////

  // ////////////////////////
  // REST API
  // ////////////////////////
  app.use('/public', express.static(`${process.cwd()}/dist/server/public`));
  app.use('/public', serveIndex(`${process.cwd()}/dist/server/public`));

  app.use('/logs', express.static(`${process.cwd()}/logs`));
  app.use('/logs', serveIndex(`${process.cwd()}/logs`));

  app.use('/favicon.ico', express.static(`${process.cwd()}/dist/server/public/favicon.ico`));

  app.use('/', router);

  app.use(customResponseError);
  // ////////////////////////

  const port = process.env.PORT;

  if (!port) {
    logger.error("Error env vars not passed! For development use command 'npm run docker-compose-up'.");
    process.exit(1);
  }

  app.listen(port, () => {
    logger.info(`Server running on port ${port}.`);
  });
};
