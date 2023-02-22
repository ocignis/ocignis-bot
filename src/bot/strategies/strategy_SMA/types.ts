import { z } from 'zod';

export const Strategy_SMA_ConfigSchema = z.object({
  periodShort: z.number().positive(),
  periodLong: z.number().positive(),
});

export type Strategy_SMA_Config = z.infer<typeof Strategy_SMA_ConfigSchema>;

export type Strategy_SMA_Constructor = Strategy_SMA_Config;
