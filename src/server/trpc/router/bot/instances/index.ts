import { z } from 'zod';

import { BotInstanceSchema } from 'bot';
import { BotInstance } from 'bot/Bot/types';
import prisma from 'prisma/prismaClient';

import { router, publicProcedure } from '../../..';

export const instancesRouter = router({
  destroy: publicProcedure.input(z.object({ name: z.string().min(1) })).mutation(async ({ input: { name } }) => {
    await prisma.botInstance.delete({ where: { name } });
  }),

  list: publicProcedure.query(async () => {
    const botInstanceRecords = await prisma.botInstance.findMany({ orderBy: [{ name: 'asc' }] });

    const botInstances = botInstanceRecords.map((botInstanceRecord) => botInstanceRecord.botInstance as BotInstance);

    return botInstances;
  }),

  upsert: publicProcedure.input(BotInstanceSchema).mutation(async ({ input: botInstance }) => {
    await prisma.botInstance.upsert({
      where: { name: botInstance.name },
      update: { botInstance: botInstance },
      create: {
        botInstance: botInstance,
        name: botInstance.name,
        symbolPair: botInstance.strategyConfig.symbolPair,
      },
    });
  }),
});
