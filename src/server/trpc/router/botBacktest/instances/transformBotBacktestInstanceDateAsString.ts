import { BotBacktestInstance } from 'bot/BotBacktest/types';

type BacktestConfigDateAsString = Omit<BotBacktestInstance['backtestConfig'], 'startTime' | 'endTime'> & {
  startTime: string;
  endTime: string;
};
export type BotBacktestInstanceDateAsString = Omit<BotBacktestInstance, 'backtestConfig'> & {
  backtestConfig: BacktestConfigDateAsString;
};

export const transformBotBacktestInstanceDateAsString = (
  botBacktestInstance: BotBacktestInstance,
): BotBacktestInstanceDateAsString => {
  const botBacktestInstanceDateAsString: BotBacktestInstanceDateAsString = {
    ...botBacktestInstance,
    backtestConfig: {
      ...botBacktestInstance.backtestConfig,
      startTime: botBacktestInstance.backtestConfig.startTime.toISOString(),
      endTime: botBacktestInstance.backtestConfig.endTime.toISOString(),
    },
  };

  return botBacktestInstanceDateAsString;
};
