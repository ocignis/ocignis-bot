import { z } from 'zod';

import { BotConfigSchema } from 'bot/Bot/types';
import { Trades } from 'bot/common/types';

import { Strategy } from '../Strategy';

const BacktestConfigSchema = z.object({
  balance_BUSD: z.number().positive(),
  startTime: z.date().min(new Date('2017-01-01T00:00:00.000Z')),
  endTime: z.date().max(new Date()),
  fee: z.number().nonnegative(),
});

export const BotBacktestConfigSchema = BotConfigSchema.and(
  z.object({
    backtestConfig: BacktestConfigSchema,
  }),
);

export type BotBacktestConfig = z.infer<typeof BotBacktestConfigSchema>;

export const BotBacktestInstanceSchema = BotBacktestConfigSchema.and(
  z.object({
    name: z.string().min(1),
    description: z.string(),
  }),
);

export type BotBacktestInstance = z.infer<typeof BotBacktestInstanceSchema>;

export type BotBacktestConstructor = BotBacktestConfig;

type BotBacktestFsmIdleInitializing = {
  status: 'idle' | 'initializing';
};
export type BotBacktestFsmInitializedRunning = {
  status: 'initialized' | 'running';
  strategy: Strategy;
  tradesDataset: Trades;
};

export type BotBacktestFsm = BotBacktestFsmIdleInitializing | BotBacktestFsmInitializedRunning;

export type BotBacktestCommands = {
  initialize: () => void;
  start: () => void;
};
