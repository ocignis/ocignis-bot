import { z } from 'zod';

export const Strategy_CustomStrategy_ConfigSchema = z.object({
  customStrategyParam: z.string(),
  periodShort: z.number().positive(),
  periodLong: z.number().positive(),
});

export type Strategy_CustomStrategy_Config = z.infer<typeof Strategy_CustomStrategy_ConfigSchema>;

export type Strategy_CustomStrategy_Constructor = Strategy_CustomStrategy_Config;
