import { z } from 'zod';

import { BotBacktest, BotBacktestConfigSchema } from 'bot';

import { router, publicProcedure } from '../../..';

export const commandsRouter = router({
  run: publicProcedure
    .input(z.object({ botBacktestConfig: BotBacktestConfigSchema, isIncluded_data_tradesDataset: z.boolean() }))
    .mutation(async ({ input: { botBacktestConfig, isIncluded_data_tradesDataset } }) => {
      const botBacktest = new BotBacktest(botBacktestConfig);

      await botBacktest.initialize();
      const botBacktestReport = botBacktest.start();

      if (isIncluded_data_tradesDataset) {
        return botBacktestReport;
      }

      // @ts-expect-error Ignore immutability.
      botBacktestReport.data.tradesDataset = [];
      return botBacktestReport;
    }),
});
