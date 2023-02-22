import { KlineInterval } from 'bot/common/types';
import { calculateQuotientAndRemainder } from 'bot/common/utils';
import { addMinutesUnix } from 'common/utils';

import { getTimeDifference } from './getTimeDifference';

type SplitTimeIntoIntervalsParams = {
  startTime: number;
  endTime: number;
  klineInterval: KlineInterval;
  klinesMaxLimit: number;
};

type SplitTimeIntoIntervalsReturn = ReadonlyArray<{ startTime: number; endTime: number }>;

export const splitTimeIntoIntervals = ({
  startTime,
  endTime,
  klineInterval,
  klinesMaxLimit,
}: SplitTimeIntoIntervalsParams): SplitTimeIntoIntervalsReturn => {
  const timeDifference = getTimeDifference({ startTime, endTime, klineInterval });

  const { quotient: numOfIntervalsWithMaxKlines, remainder: numOfRemainingKlines } = calculateQuotientAndRemainder({
    dividend: timeDifference,
    divisor: klinesMaxLimit,
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const intervalsWithMaxKlines = [...new Array(numOfIntervalsWithMaxKlines)].map((_noop, index) => {
    const startTimeMaxLimit = addMinutesUnix(startTime, index * klinesMaxLimit);
    const endTimeMaxLimit = addMinutesUnix(startTimeMaxLimit, (index + 1) * klinesMaxLimit);

    return { startTime: startTimeMaxLimit, endTime: endTimeMaxLimit };
  });

  const startTimeRemaining = addMinutesUnix(startTime, numOfIntervalsWithMaxKlines * klinesMaxLimit);
  const endTimeRemaining = addMinutesUnix(startTimeRemaining, numOfRemainingKlines);

  const intervalWithRemainingKlines = { startTime: startTimeRemaining, endTime: endTimeRemaining };

  return [...intervalsWithMaxKlines, intervalWithRemainingKlines];
};
