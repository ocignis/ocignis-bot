import { z } from 'zod';

import { Strategy_CustomStrategy_ConfigSchema } from 'bot/strategies/strategy_CustomStrategy/types';
import { Strategy_SMA_ConfigSchema } from 'bot/strategies/strategy_SMA/types';
import { StrategyName } from 'bot/strategies/StrategyName';

import { Strategy, StrategyConfigSchema } from '../Strategy';

export const BotConfigSchema = z.discriminatedUnion('strategyName', [
  z.object({
    strategyName: z.literal('SMA' satisfies StrategyName),
    strategyConfig: StrategyConfigSchema,
    strategySpecificConfig: Strategy_SMA_ConfigSchema,
  }),
  z.object({
    strategyName: z.literal('CustomStrategy' satisfies StrategyName),
    strategyConfig: StrategyConfigSchema,
    strategySpecificConfig: Strategy_CustomStrategy_ConfigSchema,
  }),
]);

export type BotConfig = z.infer<typeof BotConfigSchema>;

export const BotInstanceSchema = BotConfigSchema.and(
  z.object({
    name: z.string().min(1),
    description: z.string(),
  }),
);

export type BotInstance = z.infer<typeof BotInstanceSchema>;

export type BotConstructor = BotConfig;

type BotFsmIdleInitializing = {
  status: 'idle' | 'initializing';
};
type BotFsmInitializedRunningStopping = {
  status: 'initialized' | 'running' | 'stopping';
  strategy: Strategy;
};

export type BotFsm = BotFsmIdleInitializing | BotFsmInitializedRunningStopping;

export type BotCommands = {
  initialize: () => void;
  start: () => void;
  stop: () => void;
  status: () => void;
};
