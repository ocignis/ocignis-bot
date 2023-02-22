// src/bot/common/types/KlineInterval.ts
var KLINE_INTERVALS = [
  '1s',
  '1m',
  // '3m',
  // '5m',
  // '15m',
  // '30m',
  '1h',
  // '2h',
  // '4h',
  // '6h',
  // '8h',
  // '12h',
  '1d',
  // '3d',
  '1w',
  '1M',
];

// src/bot/common/types/SymbolPair.ts
var SYMBOL_PAIRS = [
  // Available also on paper testing - Start
  'BTCBUSD',
  // 'ETHBUSD',
  // Available also on paper testing - End
  // 'SOLBUSD',
  'AVAXBUSD',
  'MATICBUSD',
];

// src/bot/common/consts/FEE_RATE.ts
var FEE_RATE_TRADING = {
  noFee: 0,
  spotTrading_Limit: 0.09,
  spotTrading_Market: 0.1,
  usdmFuturesTrading_Limit: 0.012,
  usdmFuturesTrading_Market: 0.03,
  coinmFuturesTrading_Limit: 0.01,
  coinmFuturesTrading_Market: 0.05,
};
var FEE_RATE_BORROW = {
  marginBorrowDailyInterest: 0.03,
};

// src/bot/strategies/StrategyName.ts
var STRATEGY_NAMES = ['SMA', 'CustomStrategy'];

// src/bot/Bot/types.ts
import { z as z4 } from 'zod';

// src/bot/strategies/strategy_CustomStrategy/types.ts
import { z } from 'zod';
var Strategy_CustomStrategy_ConfigSchema = z.object({
  isShortingEnabled: z.boolean().default(false),
});

// src/bot/strategies/strategy_SMA/types.ts
import { z as z2 } from 'zod';
var Strategy_SMA_ConfigSchema = z2.object({
  periodShort: z2.number().positive(),
  periodLong: z2.number().positive(),
});

// src/bot/Strategy/types.ts
import { z as z3 } from 'zod';
var StrategyConfigSchema = z3.object({
  symbolPair: z3.enum(SYMBOL_PAIRS),
  /**
   *  Open position with relative entry amount of your balance.
   */
  entryAmountRelative: z3.number().positive({ message: 'Must ba a positive number.' }),
  /**
   *  Get this info from exchange, it varies per asset.
   */
  assetDecimalPlaces: z3.number().min(0).max(5),
});

// src/bot/Bot/types.ts
var BotConfigSchema = z4.discriminatedUnion('strategyName', [
  z4.object({
    strategyName: z4.literal('SMA'),
    strategyConfig: StrategyConfigSchema,
    strategySpecificConfig: Strategy_SMA_ConfigSchema,
  }),
  z4.object({
    strategyName: z4.literal('CustomStrategy'),
    strategyConfig: StrategyConfigSchema,
    strategySpecificConfig: Strategy_CustomStrategy_ConfigSchema,
  }),
]);
var BotInstanceSchema = BotConfigSchema.and(
  z4.object({
    name: z4.string().min(1),
    description: z4.string(),
  }),
);

// src/bot/BotBacktest/types.ts
import { z as z5 } from 'zod';
var BacktestConfigSchema = z5.object({
  balance_BUSD: z5.number().positive(),
  startTime: z5.date().min(/* @__PURE__ */ new Date('2017-01-01T00:00:00.000Z')),
  endTime: z5.date().max(/* @__PURE__ */ new Date()),
  fee: z5.number().nonnegative(),
});
var BotBacktestConfigSchema = BotConfigSchema.and(
  z5.object({
    backtestConfig: BacktestConfigSchema,
  }),
);
var BotBacktestInstanceSchema = BotBacktestConfigSchema.and(
  z5.object({
    name: z5.string().min(1),
    description: z5.string(),
  }),
);
export {
  BotBacktestConfigSchema,
  BotBacktestInstanceSchema,
  BotConfigSchema,
  BotInstanceSchema,
  FEE_RATE_BORROW,
  FEE_RATE_TRADING,
  KLINE_INTERVALS,
  STRATEGY_NAMES,
  SYMBOL_PAIRS,
};
