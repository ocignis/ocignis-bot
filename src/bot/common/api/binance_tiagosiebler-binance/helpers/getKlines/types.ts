import { KlineInterval } from 'bot/common/types';

import { SymbolPair } from '../../../../types';

type Time = {
  startTimeIso: string;
  /**
   * If endTimeIsoFormat value is not passed, it defaults to current time.
   */
  endTimeIso?: string;
};

type GetKlinesParams = {
  symbolPair: SymbolPair;
  klineInterval: KlineInterval;
  /**
   * If time is not passed, the most recent klines are returned.
   */
  time?: Time;
  /**
   * Default & Max is 1000.
   */
  limit?: number;
};

type GetKlinesReturn = KlinesTransformed;

export type GetKlines = (params: GetKlinesParams) => Promise<GetKlinesReturn>;

export type KlineTransformed = {
  openTime: number;
  openPrice: number;
  highPrice: number;
  lowPrice: number;
  closePrice: number;
  volume: number;
  closeTime: number;
  quoteAssetVolume: number;
  nrTrades: number;
  takerBuyBaseAssetVolume: number;
  takerBuyQuoteAssetVolume: number;
};
export type KlinesTransformed = Array<KlineTransformed>;
