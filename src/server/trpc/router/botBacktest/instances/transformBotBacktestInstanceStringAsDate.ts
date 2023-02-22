import { BotBacktestInstance } from 'bot/BotBacktest/types';

import { BotBacktestInstanceDateAsString } from './transformBotBacktestInstanceDateAsString';

export const transformBotBacktestInstanceStringAsDate = (
  botBacktestInstanceDateAsString: BotBacktestInstanceDateAsString,
): BotBacktestInstance => {
  const botBacktestInstance: BotBacktestInstance = {
    ...botBacktestInstanceDateAsString,
    backtestConfig: {
      ...botBacktestInstanceDateAsString.backtestConfig,
      startTime: new Date(botBacktestInstanceDateAsString.backtestConfig.startTime),
      endTime: new Date(botBacktestInstanceDateAsString.backtestConfig.endTime),
    },
  } as BotBacktestInstance;

  return botBacktestInstance;
};
