import { Prisma } from '@prisma/client';
import { z } from 'zod';

import { BotBacktestInstanceSchema } from 'bot';
import prisma from 'prisma/prismaClient';

import { router, publicProcedure } from '../../..';

import {
  BotBacktestInstanceDateAsString,
  transformBotBacktestInstanceDateAsString,
} from './transformBotBacktestInstanceDateAsString';
import { transformBotBacktestInstanceStringAsDate } from './transformBotBacktestInstanceStringAsDate';

export const instancesRouter = router({
  destroy: publicProcedure.input(z.object({ name: z.string().min(1) })).mutation(async ({ input: { name } }) => {
    await prisma.backtestBotBacktestInstance.delete({ where: { name } });
  }),

  list: publicProcedure.query(async () => {
    const botBacktestInstanceDateAsStringRecords = await prisma.backtestBotBacktestInstance.findMany({
      orderBy: [{ name: 'asc' }],
    });

    const botBacktestInstances = botBacktestInstanceDateAsStringRecords.map((botBacktestInstanceDateAsStringRecord) => {
      const botBacktestInstanceDateAsString =
        botBacktestInstanceDateAsStringRecord.botBacktestInstance as BotBacktestInstanceDateAsString;
      return transformBotBacktestInstanceStringAsDate(botBacktestInstanceDateAsString);
    });

    return botBacktestInstances;
  }),

  upsert: publicProcedure.input(BotBacktestInstanceSchema).mutation(async ({ input: botBacktestInstance }) => {
    const botBacktestInstanceDateAsString = transformBotBacktestInstanceDateAsString(botBacktestInstance);

    await prisma.backtestBotBacktestInstance.upsert({
      where: {
        name: botBacktestInstanceDateAsString.name,
      },
      update: {
        botBacktestInstance: botBacktestInstanceDateAsString satisfies Prisma.JsonObject,
      },
      create: {
        botBacktestInstance: botBacktestInstanceDateAsString satisfies Prisma.JsonObject,
        name: botBacktestInstanceDateAsString.name,
        symbolPair: botBacktestInstanceDateAsString.strategyConfig.symbolPair,
      },
    });
  }),
});
