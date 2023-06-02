import { BotBacktestConfig, BotBacktestConfigSchema } from 'bot';
import { FEE_RATE_TRADING } from 'bot/common/consts';

export const SMA_01 = BotBacktestConfigSchema.parse({
  strategyName: 'SMA',
  strategyConfig: {
    symbolPair: 'AVAXBUSD',
    entryAmountRelative: 10,
    assetDecimalPlaces: 4,
  },
  strategySpecificConfig: {
    periodShort: 3,
    periodLong: 8,
  },
  backtestConfig: {
    balance_BUSD: 3000,
    startTime: new Date('2023-04-01T00:00:00.000Z'),
    endTime: new Date('2023-04-02T00:00:00.000Z'),
    fee: FEE_RATE_TRADING.noFee,
  },
} satisfies BotBacktestConfig);

export const SMA_02 = BotBacktestConfigSchema.parse({
  strategyName: 'SMA',
  strategyConfig: {
    symbolPair: 'AVAXBUSD',
    entryAmountRelative: 10,
    assetDecimalPlaces: 4,
  },
  strategySpecificConfig: {
    periodShort: 3,
    periodLong: 8,
  },
  backtestConfig: {
    balance_BUSD: 3000,
    startTime: new Date('2023-04-01T00:00:00.000Z'),
    endTime: new Date('2023-04-02T00:00:00.000Z'),
    fee: FEE_RATE_TRADING.noFee,
  },
} satisfies BotBacktestConfig);

export const SMA_03 = BotBacktestConfigSchema.parse({
  strategyName: 'SMA',
  strategyConfig: {
    symbolPair: 'AVAXBUSD',
    entryAmountRelative: 10,
    assetDecimalPlaces: 4,
  },
  strategySpecificConfig: {
    periodShort: 12,
    periodLong: 26,
  },
  backtestConfig: {
    balance_BUSD: 3000,
    startTime: new Date('2023-04-01T00:00:00.000Z'),
    endTime: new Date('2023-04-02T00:00:00.000Z'),
    fee: FEE_RATE_TRADING.noFee,
  },
} satisfies BotBacktestConfig);
