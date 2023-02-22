import {
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInSeconds,
  differenceInWeeks,
} from 'date-fns';

import { KlineInterval } from 'bot/common/types';

type GetTimeDifferenceParams = {
  startTime: number;
  endTime: number;
  klineInterval: KlineInterval;
};

export const getTimeDifference = ({ startTime, endTime, klineInterval }: GetTimeDifferenceParams): number => {
  switch (klineInterval) {
    case '1s':
      return differenceInSeconds(endTime, startTime);

    case '1m':
      return differenceInMinutes(endTime, startTime);

    case '1h':
      return differenceInHours(endTime, startTime);

    case '1d':
      return differenceInHours(endTime, startTime);

    case '1w':
      return differenceInWeeks(endTime, startTime);

    case '1M':
      return differenceInMonths(endTime, startTime);
  }
};
