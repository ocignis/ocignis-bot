import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { Bot, BotConfigSchema } from 'bot';

import { router, publicProcedure } from '../../..';

let bot: Bot | null = null;

export const commandsRouter = router({
  run: publicProcedure.input(z.object({ botConfig: BotConfigSchema })).mutation(async ({ input: { botConfig } }) => {
    try {
      bot = new Bot(botConfig);

      await bot.initialize();
      bot.start();
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: JSON.stringify(error),
        cause: error,
      });
    }
  }),

  stop: publicProcedure.input(z.object({ botId: z.string().min(1) })).mutation(({ input: { botId } }) => {
    console.log('botId:', botId);

    if (!bot) {
      return;
    }

    bot.stop();
  }),

  status: publicProcedure.input(z.object({ botId: z.string().min(1) })).mutation(({ input: { botId } }) => {
    console.log('botId:', botId);

    if (!bot) {
      return;
    }

    const data = bot.status();

    return data;
  }),
});
