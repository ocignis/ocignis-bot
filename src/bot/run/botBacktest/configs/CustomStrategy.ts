import { BotBacktestConfig, BotBacktestConfigSchema } from 'bot';
import { FEE_RATE_TRADING } from 'bot/common/consts';

export const CustomStrategy_01 = BotBacktestConfigSchema.parse({
  strategyName: 'CustomStrategy',
  strategyConfig: {
    symbolPair: 'AVAXBUSD',
    entryAmountRelative: 10,
    assetDecimalPlaces: 4,
  },
  strategySpecificConfig: {
    customStrategyParam: 'my-custom-param',
    periodShort: 3,
    periodLong: 8,
  },
  backtestConfig: {
    balance_BUSD: 10000,
    startTime: new Date('2023-04-01T00:00:00.000Z'),
    endTime: new Date('2023-04-02T00:00:00.000Z'),
    fee: FEE_RATE_TRADING.spotTrading_Market * 0,
  },
} satisfies BotBacktestConfig);
