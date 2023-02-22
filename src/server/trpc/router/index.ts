import { router } from '..';

import { botRouter } from './bot';
import { botBacktestRouter } from './botBacktest';
import { logsRouter } from './logs';

export const appRouter = router({
  bot: botRouter,
  botBacktest: botBacktestRouter,
  logs: logsRouter,
});

export type AppRouter = typeof appRouter;
