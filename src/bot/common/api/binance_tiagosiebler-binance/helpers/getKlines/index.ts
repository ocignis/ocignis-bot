// https://binance-docs.github.io/apidocs/spot/en/#kline-candlestick-data
// Weight(IP): 1

import { formatDateToUnix } from 'common/utils';

import { binanceServiceMain } from '../..';

import { splitTimeIntoIntervals } from './splitTimeIntoIntervals';
import { transformKlinesResponse } from './transformKlinesResponse';
import { GetKlines } from './types';

const KLINES_MAX_LIMIT = 1000;

export const getKlines: GetKlines = async ({ symbolPair, klineInterval, time, limit = KLINES_MAX_LIMIT }) => {
  if (!time) {
    const klines = await binanceServiceMain.getKlines({ symbol: symbolPair, interval: klineInterval, limit });

    const klinesTransformed = transformKlinesResponse(klines);

    return klinesTransformed;
  }

  const { startTimeIso, endTimeIso } = time;

  const startTime = formatDateToUnix(startTimeIso);
  const endTime = endTimeIso ? formatDateToUnix(endTimeIso) : formatDateToUnix(new Date().toISOString());

  const timeIntervals = splitTimeIntoIntervals({
    startTime,
    endTime,
    klineInterval,
    klinesMaxLimit: KLINES_MAX_LIMIT,
  });

  const klinesPromises = timeIntervals.map(async ({ startTime, endTime }) => {
    const klinesInMaxArraySize = await binanceServiceMain.getKlines({
      symbol: symbolPair,
      interval: klineInterval,
      startTime,
      endTime,
      limit,
    });

    const klinesTransformed = transformKlinesResponse(klinesInMaxArraySize);
    return klinesTransformed;
  });

  const klines = await Promise.all(klinesPromises);

  return klines.flat();
};
