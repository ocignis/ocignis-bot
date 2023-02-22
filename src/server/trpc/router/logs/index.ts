import { z } from 'zod';

import { logger } from 'common/utils';

import { router, publicProcedure } from '../..';
export const logsRouter = router({
  triggerAll: publicProcedure.query(() => {
    logger.error('tRPC: This is an error log');
    logger.warn('tRPC: This is a warn log');
    logger.info('tRPC: This is a info log');
    logger.http('tRPC: This is a http log');
    logger.debug('tRPC: This is a debug log');

    return 'All logs triggered!';
  }),

  destroy: publicProcedure.query(() => {
    try {
      // delete all logs

      return `Number of logs deleted: ${4}`;
    } catch (err) {
      console.log('🔎 Log ~ logsDestroy:publicProcedure.query ~ err', err);
      logger.error(err);
    }
  }),

  show: publicProcedure
    .input(
      z.object({
        logType: z.union([z.literal('all'), z.literal('error')]),
        logDate: z.optional(z.string()),
      }),
    )
    .query((req) => {
      return { data: req.input };
    }),
});
