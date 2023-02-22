/* eslint-disable @typescript-eslint/consistent-type-definitions */

import { z } from 'zod';

const envVariables = z.object({
  NODE_ENV: z.union([
    z.literal('development'),
    z.literal('development-simulate'),
    z.literal('development-paper-testing'),
    z.literal('production'),
  ]),
  PORT: z.string(),
  DATABASE_URL: z.string(),
  BINANCE_API_KEY: z.string(),
  BINANCE_API_SECRET: z.string(),
  BINANCE_API_KEY_TESTNET: z.string(),
  BINANCE_API_SECRET_TESTNET: z.string(),
});

declare global {
  namespace NodeJS {
    type ProcessEnv = z.infer<typeof envVariables>;
  }
}
