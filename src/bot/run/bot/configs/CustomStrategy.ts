import { BotConfig } from 'bot';

export const CustomStrategy_01: BotConfig = {
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
};
