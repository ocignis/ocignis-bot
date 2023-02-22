/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { mean, median, std, min, max, variance } from 'mathjs';

import { Trades } from 'bot/common/types';
import { calculateRoi } from 'bot/common/utils';

type GetMarketParams = {
  tradesDataset: Trades;
};

export const getMarket = ({ tradesDataset }: GetMarketParams) => {
  const tradesPricesAll = tradesDataset.map((trade) => trade.price);

  const firstTrade = tradesDataset.at(0);
  const firstTradePrice = firstTrade ? firstTrade.price : 0;
  const lastTrade = tradesDataset.at(-1);
  const lastTradePrice = lastTrade ? lastTrade.price : 0;

  return {
    startPrice: `${firstTradePrice}$`,
    endPrice: `${lastTradePrice}$`,
    change: {
      absolute: `${calculateRoi({ startValue: firstTradePrice, endValue: lastTradePrice }).absolute.toFixed(2)}$`,
      relative: `${calculateRoi({ startValue: firstTradePrice, endValue: lastTradePrice }).relative.toFixed(2)}%`,
    },
    datasetSizeNumOfTrades: tradesDataset.length,
    priceMin: tradesPricesAll.length ? `${min(tradesPricesAll).toFixed(2)}$` : 0,
    priceMax: tradesPricesAll.length ? `${max(tradesPricesAll).toFixed(2)}$` : 0,
    priceMean: tradesPricesAll.length ? `${mean(tradesPricesAll).toFixed(2)}$` : 0,
    priceMedian: tradesPricesAll.length ? `${median(tradesPricesAll).toFixed(2)}$` : 0,
    // @ts-expect-error Wrong return type in mathjs library.
    priceStandardDeviation: tradesPricesAll.length ? `${std(tradesPricesAll).toFixed(2)}$` : 0,
    // @ts-expect-error Wrong return type in mathjs library.
    priceVariance: tradesPricesAll.length ? `${variance(tradesPricesAll).toFixed(2)}` : 0,
  } as const;
};
