import { BotConfig } from 'bot';

export const SMA_01: BotConfig = {
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
};
