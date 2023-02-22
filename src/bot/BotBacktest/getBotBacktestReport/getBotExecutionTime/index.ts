import { BotBacktest } from 'bot/BotBacktest';
import { calculateTimespan } from 'common/utils';

type GetBotExecutionTimeParams = {
  executionTime: BotBacktest['_executionTime'];
};

export const getBotExecutionTime = ({ executionTime }: GetBotExecutionTimeParams) => {
  const strategyExecutionTime = calculateTimespan({
    startTime: executionTime.start,
    endTime: executionTime.end,
  });

  const allTime = calculateTimespan({
    startTime: executionTime.initialize,
    endTime: executionTime.end,
  });

  const dataAcquisitionTime = calculateTimespan({
    startTime: executionTime.initialize,
    endTime: executionTime.start,
  });

  return {
    strategyExecutionTime,
    dataAcquisitionTime,
    allTime,
  } as const;
};
