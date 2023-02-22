import { Kline as KlineBinanceResponse } from 'binance';

import { KlinesTransformed, KlineTransformed } from './types';

const enum KlineResponseIndex {
  openTime,
  openPrice,
  highPrice,
  lowPrice,
  closePrice,
  volume,
  closeTime,
  quoteAssetVolume,
  nrTrades,
  takerBuyBaseAssetVolume,
  takerBuyQuoteAssetVolume,
  unusedFieldIgnore,
}

export const transformKlinesResponse = (klines: ReadonlyArray<KlineBinanceResponse>): KlinesTransformed => {
  const klinesTransformed = klines.map((kline) => transformKlineResponse(kline));

  return klinesTransformed;
};

export const transformKlineResponse = (kline: KlineBinanceResponse): KlineTransformed => {
  const klineTransformed: KlineTransformed = {
    openTime: kline[KlineResponseIndex.openTime],
    openPrice: Number(kline[KlineResponseIndex.openPrice]),
    highPrice: Number(kline[KlineResponseIndex.highPrice]),
    lowPrice: Number(kline[KlineResponseIndex.lowPrice]),
    closePrice: Number(kline[KlineResponseIndex.closePrice]),
    volume: Number(kline[KlineResponseIndex.volume]),
    closeTime: kline[KlineResponseIndex.closeTime],
    quoteAssetVolume: Number(kline[KlineResponseIndex.quoteAssetVolume]),
    nrTrades: kline[KlineResponseIndex.nrTrades],
    takerBuyBaseAssetVolume: Number(kline[KlineResponseIndex.takerBuyBaseAssetVolume]),
    takerBuyQuoteAssetVolume: Number(kline[KlineResponseIndex.takerBuyQuoteAssetVolume]),
  };

  return klineTransformed;
};
